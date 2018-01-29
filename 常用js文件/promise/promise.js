/**
 * Created by haochai on 16/8/29.
 */
var RESOLVED = 0,
    REJECTED = 1,
    PENDING = 2;

function nextTick (cb) {
    setTimeout(cb, 100);
}

function _Promise (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];
    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

_Promise.reject = function (r) {
    return new _Promise(function (resolve, reject) {
        reject(r);
    });
};

_Promise.resolve = function (x) {
    return new _Promise(function (resolve, reject) {
        resolve(x);
    });
};

_Promise.all = function all (iterable) {
    return new _Promise(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver (i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (let i = 0; i < iterable.length; i += 1) {
            _Promise.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

_Promise.race = function race (iterable) {
    return new _Promise(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            _Promise.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p = _Promise.prototype;
p.resolve = function resolve (x) {
    let promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('_Promise settled with itself.');
        }

        let called = false;

        try {
            let then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p.reject = function reject (reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('_Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p.notify = function notify () {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            // resolve(onResolved.call(undefined, promise.value)); /* unnecessary '.call()' */
                            resolve(onResolved(promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            // resolve(onRejected.call(undefined, promise.value));  /* unnecessary '.call()' */
                            resolve(onRejected(promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p.then = function then (onResolved, onRejected) {
    var promise = this;

    return new _Promise(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};


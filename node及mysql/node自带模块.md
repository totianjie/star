> assert 断言

```javascript
const assert = require("assert");

assert("blue", "第一个值为false时以我为错误信息抛出");
assert(false, "第一个值为false时以我为错误信息抛出");
console.log(assert.ok(true, '第一个参数为false时我是错误信息抛出'));
console.log(assert.ok(false, '第一个参数为false时我是错误信息抛出'));

查看两个值是否深度相等

	assert.deepEqual: 内部比较时用的 ==
	console.log(assert.deepEqual(obj, cpObj, 'obj 和 cpObj 不深度相等时我以错误信息抛出'));
	
	assert.equal(actual, expected[, message])// 使用相等运算符（==）测试 actual 参数与 expected 参数是否相等。
    
	assert.deepStrictEqual： 内部比较时用的 ===
	assert.deepStrictEqual(object, fakeDate, 'message');

如果 value 为真，则抛出 value。 可用于测试回调函数的 error 参数。
	assert.ifError(value)
```



> fs

```
删除文件	fs.unlink(path, fn)		fs.unlinkSync('/tmp/hello');

改文件名	fs.rename('/tmp/hello', '/tmp/world', (err) => {});

监控文件变化	fs.watch(path,  { encoding: 'buffer' }, fn)
```


function echoHello (user) {
  return `欢迎用户：${user}`;
}
function echoBye (user) {
  return `欢迎 ${user} 下次在来`;
}
module.exports.echoHello = echoHello;
module.exports.echoBye = echoBye;
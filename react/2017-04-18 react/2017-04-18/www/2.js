function fn(n){
	if(n==1){
		return 1;
	}else if(n==2){
		return 1;
	}else{
		return fn(n-1)+fn(n-2);
	}
}
console.log('开始计算');
var result = fn(38);
console.log(result);
console.log('计算结束');
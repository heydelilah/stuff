// 将阿拉伯数字转为中文形式。（5位数以内的正整数）

function format(n){
	var mapping = ['零','一','二','三','四','五','六','七','八','九'];
	var unit = [null, '十', '百', '千', '万']; // 暂支持五位数以内

	var data = String(n).split('');
	var result = '';
	while(data.length){
		var value = data.shift();
		var len = data.length;

		result += mapping[value];

		if(+value && len){	// 注意个位数不需要单位
			result += unit[len];
		}
	}
	// 省略多余的零
	result = result.replace(/零+/g, '零');

	// 省略最后一个为‘零’的字符
	result = result.replace(/零$/g, '');

	console.log(result)

	return result;
}

format(10000); // 一万
format(10001); // 一万零一
format(10101); // 一万零一百零一
format(20876);






// 递归计算第n个人的年龄。第一个人10岁，第2个人比第一个大2岁，以此类推。

function getAge(age, n){
	if(n===0){
		return age;
	}
	if(n<1){
		return age-2;	// 因为是从0算起，所以减去一次增量
	}else{
		return getAge(age+2, n-1);
	}
}

for(var i = 0; i<8; i++){
	console.log('第'+i+'人:');
	console.log(getAge(10,i))
}
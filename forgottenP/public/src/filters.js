angular.module('MemoryApp')
	.filter('labelCase', function(){
		return function(name){
			// firstName -> First Name
			name = name.replace(/([A-Z])/g, ' $1');
			return name[0].toUpperCase()+name.slice(1);
		}
	})
	.filter('camelCase', function(){
		return function(name){
			// First Name -> firstName
			console.log(name)
			return name.toLowerCase().replace(/ (\w)/g, function(match, letter){
				return letter.toUpperCase();
			})
		}
	})

	.filter('fieldFilter', function(){
		return function(data, name){
			var result = {};
			angular.forEach(data, function(val, key){
				if(key != name){
					result[key] = val;
				}
			})
			// 把toJSON 也搞进来了
			// for(var key in data){
			// 	console.log(key)
			// 	if(key != name){
			// 		result[key] = data[key];
			// 	}
			// }
			return result;
		}
	})
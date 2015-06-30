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

	// 分类id 转为文字
	.filter('catecoryText', function(options){
		return function(id, name){
			var result = '';

			if(name== 'category'){
				var list = options.category;
				for (var i = 0; i < list.length; i++) {
					if(list[i].id === id){
						id = list[i].name;
					}
				};
			}
			return id;

		}

	})
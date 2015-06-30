angular.module('MemoryApp')
	.controller('ListController', function($scope, $rootScope, Memory, $location, options){
		$rootScope.PAGE = 'all';

		// 疑问： 这里的query对应什么？
		// 获取了全部的记录	
		// 'query':  {method:'GET', isArray:true}
		$scope.records = Memory.query();

		// 列显示域
		$scope.fields = ['name', 'password'].concat(options.display_field);
		console.log($scope.fields)

		// 排序
		$scope.sort = function(field){
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		}
		$scope.sort.field = 'name';
		$scope.sort.order = false;

		$scope.show = function(id){
			$location.url('record/'+id);
		}
	})

	.controller('AddController', function($scope, $rootScope, Memory, $location){
		$rootScope.PAGE = 'add';

		// 新建一条记录
		$scope.data = new Memory({
			name: ['', 'text'],
			password: ['', 'text'],
			desc: ['', 'text'],
			category: ['', 'number'],
			date: ['', 'date'],
			level: ['', 'text']
		});

		$scope.save = function(){
			// 保存前要验证表单，在这里是指lastname 和 firstName
			/* 
				疑问：
					$invalid 不知道哪里来的？
					$broadcast的详细用法？
			*/
			if($scope.newRecord.$invalid){
				$scope.$broadcast('data:invalid')
			}else{
				$scope.data.$save();
				$location.url('/record');
			}
		}
	})

	.controller('EditController', function($scope, $rootScope, Memory, $location, $routeParams){
		$rootScope.PAGE = 'edit';

		var param = parseInt($routeParams.id, 10);

		// 不是异步的吗？
		$scope.data = Memory.get({id: param});


		$scope.remove = function(){
			$scope.data.$delete();
			$location.url('/record');
		}
	})

	.controller('SettingController', function($scope, $rootScope, options, Fields){
		$rootScope.PAGE = 'setting';

		$scope.allFields = [];

		$scope.fields = options.display_field;

		Fields.headers().then(function(data){
			$scope.allFields = data;
		});

		$scope.toggle = function(field){
			var i = options.display_field.indexOf(field);
			if(i<=-1){
				options.display_field.push(field);
			}else{
				options.display_field.splice(i, 1);
			}

		}
	})













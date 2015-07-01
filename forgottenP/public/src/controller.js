angular.module('MemoryApp')
	.controller('ListController', function($scope, $rootScope, Memory, $location, options){
		$rootScope.PAGE = 'all';

		// 疑问： 这里的query对应什么？
		// 获取了全部的记录	
		// 'query':  {method:'GET', isArray:true}
		$scope.records = Memory.query();

		// 列显示域
		$scope.fields = ['name', 'password'].concat(options.display_field);

		// 排序
		$scope.sort = function(field){
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		}
		$scope.sort.field = 'name';
		$scope.sort.order = false;

		$scope.show = function(id){
			$location.url('records/'+id);
		}
	})

	.controller('AddController', function($scope, $rootScope, Memory, $location, options){
		$rootScope.PAGE = 'add';

		// 类型
		$scope.categories = options.category;
		// 当前选择的类型
		$scope.category = $scope.categories[0];

		$scope.levels = ['high','normal','lower'];

		// 新建一条记录
		$scope.data = new Memory({
			name: ['', 'text'],
			password: ['', 'text'],
			desc: ['', 'text'],
			category: ['', 'number'],
			level: ['high', 'text']
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

				// 保存类型
				$scope.data.category[0] = $scope.category.id;	
				
				$scope.data.$save();
				$location.url('/record');
			}
		}
	})

	.controller('EditController', function($scope, $rootScope, Memory, $location, $routeParams, options){
		$rootScope.PAGE = 'edit';

		// 类型
		$scope.categories = options.category;

		$scope.levels = ['high','normal','lower'];


		var param = parseInt($routeParams.id, 10);

		$scope.data = Memory.get({id: param}, function(data){
			// 当前选择的类型
			var cid = $scope.data.category[0];

			// 循环，找出id相等的那个对象
			for (var i = 0; i < $scope.categories.length; i++) {
				if($scope.categories[i].id == cid){
					$scope.category = $scope.categories[i];
				}
			};
		});

		$scope.remove = function(){
			$scope.data.$delete();
			$location.url('/record');
		}

		$scope.blurUpdate = function(){
			if($scope.live !== 'false'){

				$scope.data.category[0] = $scope.category.id;

				$scope.data.$update(function(updateRecord){
					$scope.data = updateRecord;
				});	
			}
		}

		var timeoutId;
		$scope.update = function(){
			$timeout.cancel(timeoutId);
			timeoutId = $timeout($scope.blurUpdate, 1000);
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













angular.module('MemoryApp', ['ngRoute', 'ngResource', 'ngMessages'])
	
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			// 联系人列表
			.when('/records', {
				controller: 'ListController',
				templateUrl: 'views/list.html'
			})
			// 新增联系人
			.when('/records/add', {
				controller: 'AddController',
				templateUrl: 'views/add.html'
			})
			// 编辑
			.when('/records/:id', {
				controller: 'EditController',
				templateUrl: 'views/edit.html'
			})
			// 设置
			.when('/setting', {
				controller: 'SettingController',
				templateUrl: 'views/setting.html'
			})
			.otherwise({
				redirectTo: '/records'   
			});

		// ? 和hash相关
		$locationProvider.html5Mode(true);

	})
	// 设置全局变量
	.value('options', {
		"display_field": [
			"desc",
			"category",
			"level"
		]
	})

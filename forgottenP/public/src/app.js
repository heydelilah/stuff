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
		],
		"category":[
			{id: 1, name: "Email"},
			{id: 2, name: "通讯"},
			{id: 3, name: "社区"},
			{id: 4, name: "理财"},
			{id: 5, name: "旅游"},
			{id: 6, name: "应聘"},
			{id: 7, name: "音乐"},
			{id: 8, name: "租房"},
			{id: 0, name: "其他"}
		]
	})

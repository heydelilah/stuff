'use strict';

describe('Controller: ListController', function () {

	// load the controller's module
	beforeEach(module('MemoryApp'));

	var MainCtrl,
	scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, $location) {
		location = $location;
		scope = $rootScope.$new();
		MainCtrl = $controller('ListController', {
			$scope: scope
		});
	}));

	// 可能要使用 e2e 来测试； 因为phantomjs 模拟 url 没意义
	it('should active', function () {
		expect(scope.PAGE).toEqual('all');
	});

	// ajax
	// todo
	

	it('should attach a list of fields to the scope', function () {
		expect(scope.fields.length).toBe(5);
	});
});

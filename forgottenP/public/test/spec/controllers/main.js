'use strict';

describe('Controller: ListController', function () {

  // load the controller's module
  beforeEach(module('MemoryApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('ListController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.fields.length).toBe(5);
  });
});

angular.module('ContactsApp')
	.value('FieldTypes', {
		text: ['Text', 'should be text'],
		email: ['Email', 'should be an email address'],
		number: ['Number', 'should be a number'],
		date: ['Date', 'should be a date'],
		datetime: ['Datetime', 'should be a datetime'],
		time: ['Time', 'should be a time'],
		month: ['Month', 'should be a month'],
		week: ['Week', 'should be a week'],
		url: ['URL', 'should be a URL'],
		tel: ['Phone Number', 'should be a phone number'],
		color: ['Color', 'should be a color']

	})

	.directive('formField', function($timeout, FieldTypes){
		return {
			restrict: 'EA', // 类型
			templateUrl: 'views/formField.html',
			replace: true,	// 是否替换
			scope: {
				record: '=',
				field: '@',
				live: '@',
				required: '@'
			},
			link: function($scope, element, attr){

				// 消息的格式是固定这样的吗？
				$scope.$on('record:invalid', function(){
					// 这里的调用很奇怪？为何不是$scope.record[field];
					// 这里引用的是ng-form; ng-form="{{field}}"
					$scope[$scope.field].$setDirty();
				})

				$scope.types = FieldTypes;

				$scope.remove = function(field){
					delete $scope.record[field];
					$scope.blurUpdate();
				}

				$scope.blurUpdate = function(){
					if($scope.live !== 'false'){
						// BUG: 编辑时候得快速编写，不然会更新失败然后被返回的null覆盖；
						// 有error时候，应该禁用更新
						$scope.record.$update(function(updateRecord){
							console.log(updateRecord)
							$scope.record = updateRecord;
						});	
					}
				}

				var timeoutId;
				$scope.update = function(){
					$timeout.cancel(timeoutId);
					timeoutId = $timeout($scope.blurUpdate, 1000);
				}
			}
		}
	})

	.directive('newField', function($filter, FieldTypes){
		return {
			restrict: 'EA',
			templateUrl: 'views/newField.html',
			replace: true,
			scope: {
				record: '=',
				live: '@'
			},
			// @疑问：没搞懂？
			require: '^form',
			link: function($scope, element, attr, form){
				$scope.types = FieldTypes;

				$scope.field = {};

				$scope.show = function(type){
					$scope.field.type = type;
					$scope.display = true;
				}

				$scope.remove = function(){
					$scope.field = {};
					$scope.display = false;
				}

				$scope.add = function(){
					// 合法性验证
					if(form.newField.$valid){
						var name = $filter('camelCase')($scope.field.name);
						$scope.record[name] = [$scope.field.value, $scope.field.type];
						$scope.remove();

						if($scope.live !== 'false'){
							// 更新数据库
							$scope.record.$update(function(updatedRecord){
								$scope.record = updatedRecord;
							});
						}

					}

				}
			}
		}
	})

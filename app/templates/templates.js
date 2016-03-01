angular.module('templateStore.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/templates', {
			templateUrl: 'templates/templates.html',
			controller: 'TemplatesCtrl'
		})
		.when('/templates/:templateId', {
			templateUrl: 'templates/template-details.html',
			controller: 'TemplateDetailsCtrl'
		});
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
	console.log('TemplatesCtrl Initialized');
	$http.get('json/templates.json').success(function (data) {
		$scope.templates = data;
		console.log('TemplatesCtrl data', $scope.templates);
	});
}])

.controller('TemplateDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	console.log('TemplateDetailsCtrl Initialized');
	var templateId = $routeParams.templateId;
	$http.get('json/templates.json').success(function (response) {
		$scope.template = $filter('filter')(response, function(d){
			return d.id == templateId;
		})[0];
		$scope.name = $scope.template.name;
		$scope.mainImage = $scope.template.images[0].name;
		$scope.price = $scope.template.price;
		$scope.description = $scope.template.description;
		console.log('TemplateDetailsCtrl mainImage', $scope);

	});

	$scope.setImage = function (image) {
		$scope.mainImage = image.name;
	}
}])
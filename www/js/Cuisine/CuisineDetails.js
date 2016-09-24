mod.controller('CuisineCtrl', function($http,$ionicPlatform,$scope, $ionicModal, $ionicLoading,$state) {

$scope.dishes = [];
$http.post(ip+"/api/DishesThroughCuisineId",{id:$state.params.cuisineId}).success(function(data){

			for(var d in data)
				{
				$scope.dishes.push(data[d]);
				$scope.dishes[d].img = ip + $scope.dishes[d].img.substring(1);
				}
	
});
});
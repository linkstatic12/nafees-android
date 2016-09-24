mod.controller('DishCtrl', function($http,$ionicPlatform,$scope, $ionicModal, $ionicLoading,$state,$rootScope) {
$scope.dish = {};
var checkOrders = false;
$scope.order ={};
$scope.cuisine;
$scope.like  =0;
$scope.LikeDish = function()
{

$http.get(ip+"/api/dish/Likedishes/"+$state.params.dishId).success(function(data){

$scope.likes = $scope.likes + 1;

});

}
$scope.OrderUp = function()
{
  if($scope.order.noOfPlates<10)
	$scope.order.noOfPlates = $scope.order.noOfPlates+1;
for(var ord in $rootScope.Orders)
{
if($rootScope.Orders[ord].dish == $state.params.dishId)
{
	$rootScope.Orders[ord].noOfPlates = $scope.order.noOfPlates;
    $rootScope.Orders[ord].flavour = $scope.dish.flavours;
    console.log($rootScope.Orders[ord]);
}
}
}
$scope.OrderDown = function()
{

	 if($scope.order.noOfPlates>0)
	$scope.order.noOfPlates = $scope.order.noOfPlates-1;
for(var ord in $rootScope.Orders)
{
if($rootScope.Orders[ord].dish == $state.params.dishId)
	$rootScope.Orders[ord].noOfPlates = $scope.order.noOfPlates;


}
}
$scope.$watch('dish.flavours',function(newVal,oldVal){
for(var ord in $rootScope.Orders)
{
if($rootScope.Orders[ord].dish == $state.params.dishId)
	$rootScope.Orders[ord].flavour =newVal;


}

},true);

$http.get(ip+"/api/dishes/"+$state.params.dishId).success(function(data){
$scope.cuisine = data.cuisine;
$scope.dish = data;
$scope.likes= data.likes;
$scope.dish.img = ip + $scope.dish.img.substring(1);
for(var ord in $rootScope.Orders)
{
	
if($rootScope.Orders[ord].dish == $state.params.dishId)
	{
		$scope.order = {price:$scope.dish.totalPrice,name:$scope.dish.name,img:$scope.dish.img,dish:$state.params.dishId,noOfPlates:$rootScope.Orders[ord].noOfPlates,flavour:$rootScope.Orders[ord].flavour};
		checkOrders = true;

}

}

if(checkOrders==false)
{
		$scope.order = {price:$scope.dish.totalPrice,name:$scope.dish.name,img:$scope.dish.img,dish:$state.params.dishId,noOfPlates:0,flavour:'Normal'};
		console.log($scope.order);
		$rootScope.Orders.push($scope.order);
		console.log($rootScope.Orders);
}

});
});
mod.controller('OrderCtrl', function($http,$ionicPlatform,$scope, $ionicModal, $ionicLoading,$state,$rootScope,roundProgressService,$timeout) {

   $scope.timer = 0;	
	// for(var d in $rootScope.Orders)
	// {
 //    if($rootScope.Orders[d].noOfPlates==0)
 //    	   $rootScope.Orders =  $rootScope.Orders.splice(d-1,1);

	// }
//console.log($rootScopeOrders[0]);
$scope.cost = 0;
$scope.GST = 0.16;
$scope.costwithGST = 0;
	for(var d in $rootScope.Orders)
	      $scope.cost = $scope.cost + ($rootScope.Orders[d].price*$rootScope.Orders[d].noOfPlates);

$scope.costwithGST = $scope.cost +($scope.cost*$scope.GST);

// 
$scope.onTimeout = function() {
      if ($scope.timer === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        $state.go("review");
        return;
      }
      $scope.timer--;
      
      mytimeout = $timeout($scope.onTimeout, 1000);
    };
 $scope.humanizeDurationTimer = function(input, units) {
 	
      // units is a string with possible values of y, M, w, d, h, m, s, ms
      if (input == 0) {
        return 0;
      } else {
        var duration = moment().startOf('day').add(input, units);
        var format = "";
        if (duration.hour() > 0) {
          format += "H[h] ";
        }
        if (duration.minute() > 0) {
          format += "m[m] ";
        }
        if (duration.second() > 0) {
          format += "s[s] ";
        }
        return duration.format(format);
      }
    };
$scope.SendToChef = function()
{
if($scope.costwithGST>0)
{
	var copycat = $rootScope.Orders;

	

$http.post(ip+'/api/orders/PlaceOrder',{table:$rootScope.table,data:$rootScope.Orders,totalPrice:$scope.costwithGST,subPrice:$scope.cost}).success(function(data){

$ionicLoading.show({ template: 'Chef is preparing your food', noBackdrop: true, duration: 3000 });
$rootScope.Orders=[];
 $scope.timeForTimer = 1500;
      $scope.timer = 1500;
      $scope.started = true;
      $scope.paused = false;
      $scope.done = false;
 mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.started = true;

});
}
else
	$ionicLoading.show({ template: 'Hey select something', noBackdrop: true, duration: 3000 });


}


});
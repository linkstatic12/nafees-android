mod.controller('ReviewCtrl', function($http,$ionicPlatform,$scope, $ionicModal, $ionicLoading,$state,$rootScope,roundProgressService,$timeout) {

$scope.comment = {text:""};
$scope.comments = [];
$http.get(ip+'/api/reviews').success(function(data){
console.log(data);
$scope.comments = data;


});
$scope.Comment = function()
{
console.log($scope.comment.text);
$http.post(ip+'/api/reviews',{text:$scope.comment.text}).success(function(data){
	$ionicLoading.show({ template: 'Chef is preparing your food', noBackdrop: true, duration: 3000 });$ionicLoading.show({ template: 'Your comment has been sent!', noBackdrop: true, duration: 3000 });
});


	
}



});
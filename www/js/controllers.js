var mod = angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$rootScope) {


$scope.cuisines = [];
$http.get(ip+'/api/cuisines').success(function(data){
   for(var cuisine in data)
       {
          $scope.cuisines.push(data[cuisine]);
          $scope.cuisines[cuisine].img = ip + $scope.cuisines[cuisine].img.substring(1);
         

       }
       console.log($scope.cuisines);
 
});



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}).controller('SplashCtrl',function($scope,$http,$rootScope,$state){

$scope.image="img/pakistain-food.jpg";
   $scope.$on('$ionicView.afterEnter', function(){
    setTimeout(function(){
      
$state.go('tab.dash');
    }, 5000);
  });  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

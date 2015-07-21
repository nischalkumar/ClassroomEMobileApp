angular.module('starter.controllers', [])

.controller('LoginController', function($scope, $http, $location) {
 
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 


// http://104.236.116.175:8090/oauth/token -H "Accept: application/json" -d "password=check&username=student&grant_type=password&scope=read%20write&client_secret=123456&client_id=clientapp"curl -X POST -vu clientapp:123456

    $scope.login = function() {
       // var ref = window.open('http://104.236.116.175:8090/oauth/token -H \"Accept: application/json\" -d \"password=check&username=student&grant_type=password&scope=read%20write&client_secret=123456&client_id=clientapp');
       // ref.addEventListener('loadstart', function(event) { 
       //     if((event.url).startsWith("http://localhost:8100/callback")) {
       //         requestToken = (event.url).split("code=")[1];
              //  $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost:8100/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
       
       // var callbackURL = 'http://104.236.116.175:8090/oauth/token -H \"Accept: application/json\" -d \"password=check&username=student&grant_type=password&scope=read%20write&client_secret=123456&client_id=clientapp'
      // var callbackURL = "http://104.236.116.175:8090/oauth/token" ;

                $http
                ({
                  method: "post", 
                  url: "http://104.236.116.175:8090/oauth/token", 
                  data:  "client_id=" + clientId + "&client_secret=" + clientSecret + "password=check&username=student&grant_type=password" + "&scope=read%20write",
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                    }
                })                
                   .success(function(data) {
                        accessToken = data.access_token;
                        $location.path("/secure");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });
         //       ref.close();
        //    }
       // });
    }
 
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }
    
})
 
.controller('SecureController', function($scope, $http) {
 
    $scope.accessToken = accessToken;
    
})


.controller('DashCtrl', function($scope) {})

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
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,ProfileService) {
  // $scope.settings = {
  //   enableFriends: true
  // };
 $scope.user = ProfileService.query();
 //$scope.

});

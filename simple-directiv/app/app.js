var app = angular.module('app', [])

app.directive('customHeader', function(){
  return {
    restrict: 'E',
    templateUrl: './app/templates/header.html',
    controller: function(){
      var vm = this;
      vm.active = 'home';
      vm.setActive = function(tab){
        vm.active = tab;
      };
      vm.isActive = function(tab){
        return vm.active == tab;
      };
    },
    controllerAs: 'headerCtrl'
  }
})
.directive('reviews', function(){
  return {
    restrict: 'A',
    templateUrl: './app/templates/reviews.html',
    controller: function() {
      var vm = this;
      vm.reviews = [{name: 'Melan', body:'You\'re gonna love it', date:'Tue Apr 19 2016 09:27:46'}];
      vm.newReview = {}
      vm.submit = function() {
        var today = new Date().toString();
        vm.newReview.date = today.split('G')[0];
        vm.reviews.push(vm.newReview);
        vm.newReview = {};
      };
    },
    controllerAs: 'reviewCtrl'
  }
})
.directive('move', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      var x = 0;
      var y = 0
      element.on('mousemove', function(){
        x = Math.random() * (200 - 1) + 1
        y = Math.random() * (200 - 1) + 1
        element.css({
          display:'inline',
          position:'relative',
          top: y + 'px',
          left: x + 'px'
        })
      })
    }
  }
})
.directive('diseases', function(){
  return {
    templateUrl:'./app/templates/home.html',
    controller: ['$http', function($http){
      var vm = this;
      vm.diseases;
      vm.single;
      vm.getDiseases = function(){
        $http.get('https://data.cdc.gov/resource/j63s-38mu.json')
        .then((res) => {
          console.log(res.data)
          function random(){
            return Math.random() * (900 - 10) + 10;
          }
          vm.diseases = res.data.slice(random());
        })
      }
    }],
    controllerAs: 'diseaseCtrl'
  }
})
.directive('disease', function(){
  return {
    restrict: 'E',
    templateUrl: './app/templates/single.html',
    link: function(scope, element, attrs){
      element.on('click', function(){
        element.css({
          color:'#'+Math.random().toString(16).substr(-6),
        })
      })
    }
  }
})

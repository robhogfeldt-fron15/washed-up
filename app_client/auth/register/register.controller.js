(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      role: ''
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(res){
          if (res.data.user.role === 'admin') {
            $location.path('profile');
          } else {
            $location.path('user');
          }
        });
    };

  }

})();

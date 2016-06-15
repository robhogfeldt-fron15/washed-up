(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;
    vm.errorMessage = "Fyll i alla fält please :)";
    vm.showError = false;
    vm.credentials = {
      name : "",
      email : "",
      password : "",
      role: ''
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      for (var key in vm.credentials) {
      if (Object.prototype.hasOwnProperty.call(vm.credentials, key)) {
          var val = vm.credentials[key];
          if (val === '') {
            vm.showError = true;
            return;
          } else {
            vm.showError = false;
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
          }

      }
    }
    };
  }

})();


// vm.onSubmit = function () {
//   console.log('Submitting registration');
//   for (var key in vm.credentials) {
//   if (Object.prototype.hasOwnProperty.call(vm.credentials, key)) {
//       var val = vm.credentials[key];
//       if (val === '') {
//         vm.showError = true;
//         return;
//       } else {
//         vm.showError = false;
//       authentication
//         .register(vm.credentials)
//         .error(function(err){
//           alert(err);
//         })
//         .then(function(res){
//           if (res.data.user.role === 'admin') {
//             $location.path('profile');
//           } else {
//             $location.path('user');
//           }
//         });
//       }
//
//   }
// }
// };

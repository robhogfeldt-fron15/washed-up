(function() {

  angular
    .module('meanApp')
    .service('Users', users);

  users.$inject = ['$http', 'authentication'];
  function users ($http, authentication) {

    var getUsers = function () {
      	return $http.get('/api/users');
    };


    return {
      getUsers : getUsers
    };
  }

})();

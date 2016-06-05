(function() {

  angular
    .module('meanApp')
    .service('Machines', machines);

  machines.$inject = ['$http', 'authentication'];
  function machines ($http, authentication) {

    var getMachines = function () {
      	return $http.get('/api/machines');
    };

    var createMachine = function (machine) {
      	return $http.post('/api/machines', machine);
    };

    var deleteMachine = function (id) {
        return $http.delete('/api/machines/' + id);
    };

    return {
      getMachines : getMachines,
      createMachine : createMachine,
      deleteMachine : deleteMachine
    };
  }

})();

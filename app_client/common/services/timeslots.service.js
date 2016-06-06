(function() {

  angular
    .module('meanApp')
    .service('Timeslot', timeslots);

  timeslots.$inject = ['$http', 'authentication'];
  function timeslots ($http, authentication) {

    var getTimeslots = function () {
      	return $http.get('/api/timeslots');
    };

    var createTimeslot = function (timeslot) {
        return $http.post('/api/timeslots', timeslot);
    };

    var getByMachine = function (machine) {
      	return $http.get('/api/timeslots/' + machine);
    };

    var getByUser = function (machine, user) {
        return $http.get('/api/timeslots/' + machine + '/' + user);
    };

    return {
      getTimeslots : getTimeslots,
      createTimeslot: createTimeslot,
      getByMachine: getByMachine,
      getByUser: getByUser,

    };
  }

})();

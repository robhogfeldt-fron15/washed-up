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

    return {
      getTimeslots : getTimeslots,
      createTimeslot: createTimeslot

    };
  }

})();

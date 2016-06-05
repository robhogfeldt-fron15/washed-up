(function() {

  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', 'Machines'];

  function profileCtrl($location, meanData, Machines) {
    var vm = this;

    vm.user = {};

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function(e) {
        console.log(e);
      });


    vm.getMachines = function() {
      Machines.getMachines()
        .success(function(data) {
          vm.machines = data;
        });
    }

    vm.deleteMachine = function(id) {

      Machines.deleteMachine(id)
        .success(function(data) {
          vm.machines = data;
          vm.getMachines();
        });
    }

    vm.createMachine = function(machine) {
      console.log(machine);
      Machines.createMachine(machine)
        .success(function(data) {
          vm.loading = false;
          vm.getMachines();

        });
    }

    vm.getMachines();

  }

})();

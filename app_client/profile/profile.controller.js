(function() {

  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', 'Machines'];
  function profileCtrl($location, meanData, Machines) {
    var vm = this;


    vm.getMachines = function() {

        Machines.getMachines()
            .success(function(data) {
                vm.machines = data;
            });
          }

    vm.deleteMachine = function(id) {
      console.log(id);
     Machines.deleteMachine(id)
         .success(function(data) {
             vm.machines = data;
             console.log(vm.machines);
             vm.loading = false;
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

  }

})();

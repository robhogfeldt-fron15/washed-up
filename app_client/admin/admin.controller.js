(function() {

  angular
    .module('meanApp')
    .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$location', 'meanData', 'Machines', 'Users', 'Timeslot'];

  function adminCtrl($location, meanData, Machines, Users, Timeslot) {
    var vm = this;

    vm.user = {};
    vm.activeUser = {};

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

    vm.showUserStat = function(user) {
      vm.activeUser = user;
      Timeslot.getByUser(null, user._id)
        .success(function(data) {
          vm.userSlots = data.filter(function(user) {
            return user.role !== 'admin'
          })
          console.log(data);
        });
    }

    getUsers();

  function getUsers() {
    Users.getUsers()
        .success(function(data) {
          console.log(data);
            vm.allUsers = data;

        });
      };

    vm.getMachines();

  }

})();

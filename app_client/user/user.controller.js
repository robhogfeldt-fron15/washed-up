(function() {

  angular
    .module('meanApp')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject = ['$location', 'meanData', 'Machines','Timeslot'];

  function userCtrl($location, meanData, Machines, Timeslot) {
    var vm = this;

    vm.user = {};
    vm.activeMachine = null;

    vm.showSchedule = function(machine) {
         vm.activeMachine = machine
         console.log(machine);
     };


    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
        vm.bookings(vm.user._id)
      })
      .error(function(e) {
        console.log(e);
      });

      getSlots();
      getMachines();

      vm.bookings = function(user) {

        Timeslot.getByUser(null, user)
          .success(function(data) {
            vm.bookings = data;
            console.log(data);
          });
      }


     function getSlots() {
       Timeslot.getTimeslots()
           .success(function(data) {
             console.log(data);
               vm.allSlots = data;

           });
         };

     function getMachines() {
         Machines.getMachines()
             .success(function(data) {
                 vm.machines = data;
                 console.log(vm.machines);
                 vm.loading = false;
             });
           }


        vm.checkDate = function() {

          vm.slotArray = [];
          vm.slotArray.push({name:"morgon", isTaken:false });
          vm.slotArray.push({name:"formiddag", isTaken:false });
          vm.slotArray.push({name:"eftermiddag", isTaken:false });
          vm.slotArray.push({name:"kvall", isTaken:false });

          var takenSlots = [];
            Timeslot.getByMachine(vm.activeMachine._id)
              .success(function(slots) {

                  takenSlots = slots.filter(function(slot) {
                    console.log(slot , vm.slot.date.toLocaleDateString());
                    return slot.date === vm.slot.date.toLocaleDateString();
                  });

                   for (var i = 0; i < takenSlots.length; i++) {
                    vm.slotArray.filter(function functionName(item) {
                      if (item.name === takenSlots[i].slot ) {
                         item.isTaken = true;
                         return item;
                     } else {
                       return item;
                     }
                    })
                  }
                  console.log(takenSlots);
              });

        }

        vm.bookSlot = function(slot) {

        if (!vm.activeMachine || !vm.user || !vm.slot || !vm.slot.name ) {
          alert('Fyll i alla fält');
          return;
        }


         var slot = {
           machineId: vm.activeMachine._id,
           userId: vm.user._id,
           date: vm.slot.date.toLocaleDateString(),
           slot: vm.slot.name,
           isTaken: true
         }

         Timeslot.createTimeslot(slot)
         .success(function(data) {

           vm.checkDate();
           vm.activeMachine = null;
           Timeslot.getByUser(null, vm.user._id)
             .success(function(data) {
               vm.bookings = data;
               console.log(data);
             }.bind(this));
         });

       }

  }

})();

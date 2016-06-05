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
      })
      .error(function(e) {
        console.log(e);
      });

      getSlots();
      getMachines();

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
          console.log(vm.slot.date);

          vm.slotArray = [];
          vm.slotArray.push({name:"morgon", isTaken:false });
          vm.slotArray.push({name:"formiddag", isTaken:false });
          vm.slotArray.push({name:"eftermiddag", isTaken:false });
          vm.slotArray.push({name:"kvall", isTaken:false });

          var takenSlots = [];
          Timeslot.getTimeslots()
              .success(function(slots) {


                  takenSlots = slots.filter(function(slot) {
                    console.log(slot , vm.slot.date.toLocaleDateString());
                    return slot.date === vm.slot.date.toLocaleDateString()
                  });
                   for (var i = 0; i < takenSlots.length; i++) {
                    console.log('TAKEN SLOT', takenSlots[i].slot);
                    vm.slotArray.filter(function functionName(item) {
                      if (item.name === takenSlots[i].slot ) {
                         item.isTaken = true;
                         return item;
                     } else {
                       return item;
                     }
                    })
                  }
                  console.log(vm.slotArray);
              });

        }

        vm.bookSlot = function(slot) {
         console.log(slot);
         console.log(vm.activeMachine._id);
         console.log(vm.slot.name);


         if (vm.slot.isTaken) {
           alert('Upptagen');
           return;
         }
         var slot = {
           machineId: vm.activeMachine._id,
           date: vm.slot.date.toLocaleDateString(),
           slot: vm.slot.name,
           isTaken: true
         }

         Timeslot.createTimeslot(slot)
         .success(function(data) {
           vm.loading = false;
           console.log(data);

         });
       }

  }

})();

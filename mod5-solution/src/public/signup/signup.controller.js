(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var $ctrl = this;

  $ctrl.user = {
   'first_name' : '',
   'last_name' : '',
   'email' : '',
   'phone' : '',
   'menu_number' : ''
  }

  // Trying to move Controller
  $ctrl.submit = function() {
    $ctrl.savedUser = angular.copy($ctrl.user);

    MenuService.getFavoriteItem($ctrl.savedUser.menu_number)
      .then(function(response) {
        $ctrl.menuFavorite = response;

        $ctrl.completed = true;
        $ctrl.failed = false;

        MenuService.saveUser($ctrl.savedUser);
      })
      .catch(function(e) {
        $ctrl.completed = false;
        $ctrl.failed = true;
      });
  };

  $ctrl.favoriteExists = function() {
    MenuService.getFavoriteItem($ctrl.user.menu_number)
      .then(function(response) {
        $ctrl.exists = false;
      })
      .catch(function(e) {
        $ctrl.exists = true;
      });
  }
}


})();

(function () {
"use strict";

angular.module('public')
.controller('UserController', UserController);

UserController.$inject = ['MenuService'];
function UserController(MenuService) {
  var $ctrl = this;

  $ctrl.user = {
   'first_name'  : '',
   'last_name'   : '',
   'email'       : '',
   'phone'       : '',
   'menu_number' : ''
  }
  
  var savedUser = MenuService.getUser();
  if (savedUser == undefined) {
    $ctrl.exists = false;
    $ctrl.failed = true;
  } else {
    $ctrl.user = savedUser;
    
    MenuService.getFavoriteItem($ctrl.user.menu_number)
      .then(function(response) {
        $ctrl.menuFavorite = response;
      }
    );
    
    $ctrl.exists = true;
    $ctrl.failed = false;
  }
}


})();

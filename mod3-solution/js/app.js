(function () {
'use strict';

var app = angular.module('NarrowItDownApp', [])
		  .controller('NarrowItDownController', NarrowItDownController)
		  .service('MenuSearchService', MenuSearchService)
		  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
		  .directive('foundItems', FoundItemsDirective);


//Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var list = this;

    list.getMatchedMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise
        .then(function (response) {
          list.found = response;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong in Controller.");
        });
    };

    list.removeItem = function (itemIndex) {
      list.found.splice(itemIndex, 1);
    };
  }										/* <--------- End of Controller */


// Service 
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      	})
        .then(function (response) {
          var foundItems = response.data.menu_items;

          foundItems = foundItems.filter(function (foundItems) {
            return foundItems.description.includes(searchTerm)
          });

          return foundItems;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
    };
  }										/* <--------- End of Service */


function FoundItemsDirective() {
	var ddo = {
	  templateUrl: 'itemList.html',
	  scope: {
	    found: '<',
	    onRemove: '&'
	  },
	  controller: FoundItemsDirectiveController,
	  controllerAs: 'list',
	  bindToController: true
	};

return ddo;
}


function FoundItemsDirectiveController() {
	var list = this;

	list.noItemsFound = function () {
	  if (list.found != null) {
	    if (list.found.length == 0) {
	      return true;
	    } else {
	      return false;
	    }
	  } else {
	    return false;
	  }
	};
}

})();
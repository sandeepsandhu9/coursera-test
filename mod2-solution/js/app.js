(function () {
'use strict';

var app = angular.module('ShoppingListCheckOff', [])
		  .controller('ToBuyController', ToBuyController)
		  .controller('AlreadyBoughtController', AlreadyBoughtController)
		  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
		  .filter('total',totalFilter);

// Controller #1 -- List of Items TO BUY
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
	var toBuy = this;
	toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
	toBuy.buyItem = function(item){
		ShoppingListCheckOffService.buyItem(item);
	};
	toBuy.message = "Everything is bought!";
}												/* <--------- End of Controller #1 */

// Controller #2 -- List of Items BOUGHT
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','totalFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var bought = this;
	bought.items = ShoppingListCheckOffService.getItemsBought();
	bought.message = "Nothing bought yet";
	bought.calculateTotal = function () {
      return totalFilter();
    };	
}												/* <--------- End of Controller #2 */

// Service to exchange data between TWO controllers
function ShoppingListCheckOffService() {
	var service = this;

	//List & Quantity of Items to Buy
	var itemsToBuy = [
		{
		name: "Cookie",
		quantity: "50",
		pricePerItem: "5"
		},
		{
		name: "Donut",
		quantity: "100",
		pricePerItem: "3"
		},
		{
		name: "Milk",
		quantity: "10",
		pricePerItem: "7"
		},
		{
		name: "Chocolate",
		quantity: "10",
		pricePerItem: "10"
		},
		{
		name: "Ice-cream",
		quantity: "20",
		pricePerItem: "9"
		}
	];
	//Initialize empty Array for Items Bought
	var itemsBought = [];

	//Adds Items to bought Array and updates the toBuy array
	service.buyItem = function(item){
		var index = itemsToBuy.indexOf(item);
		if (index !== -1) {  //Checking if there are still any item(s) left
			itemsToBuy.splice(index,1);
			itemsBought.push(item);
		}
	};
		
	//Retreive the toBuy list
	service.getItemsToBuy = function(){
		return itemsToBuy;
	};

	//Retreive the boughtItems list
	service.getItemsBought = function(){
		return itemsBought;
	};
}												/* <--------- End of Service */

//Calculate Total Price Per Item
function totalFilter() {
	return function(input, quantity, pricePerItem){
		input = input || "";
		input = '$$$'+Number(pricePerItem * quantity).toFixed(2);
		return input;
	};
}

})();
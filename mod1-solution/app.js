(function () {
'use strict';

var app = angular.module('LunchCheck', []);

app.controller('LunchCheckController', LunchCheckController); 

  	LunchCheckController.$inject = ['$scope'];
		function LunchCheckController($scope) {
		//Italizing the Note Text
		$scope.noteText  = {'font-style':'italic'};

		$scope.displayMessage = function(lunchItems) {
			//Check for Empty Input String from the User & Set Styling
			if (!lunchItems || lunchItems.length == 0) {
				$scope.message = "Please enter data first";
				$scope.textboxStyle = {'border-color':'red'};
				$scope.messageStyle = {'color':'red'};
				return;
			}

			//Using Split Method to get the individual items
			var itemCount = 0;
			var input = lunchItems.split(',');

			//Looping to retrieve all the items
			for (var i in input) {
				input[i] = input[i].trim();

				//Validate user input for Empty string(s)
				if (input[i] && input.length > 0) {
					itemCount++;
				}
			}

			//Set Green Color and Border for Valid Input
			$scope.textboxStyle = {'border-color':'green'};
			$scope.messageStyle = {'color':'green'};

			//Display Appropriate message based on Number of Lunch Items
			if (itemCount > 3) {
				$scope.message = "Too Much!";
			} else {
				$scope.message = "Enjoy!";
			}
			
		}; /* <--------- End of displayMessage()*/

	}; /* <--------- End of LunchController()*/

})();
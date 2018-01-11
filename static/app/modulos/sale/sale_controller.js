myapp.controller('dashboard_controller', dashboard_controller);

dashboard_controller.$inject = ['dashboard_service', '$state', '$scope', '$timeout'];

function dashboard_controller(dashboard_service, $state, $scope, $timeout){
	
	"use strict";
	var self = this;
	self.dashboard_service = dashboard_service;

	/* ----------- */

	$scope.timeInMs = 0;

	var countUp = function() {

		self.dashboard_service.dashboardUpdate();

		$scope.timeInMs += 10000;
		$timeout(countUp, 10000);
	}

	// interval
	$timeout(countUp, 100);	

}

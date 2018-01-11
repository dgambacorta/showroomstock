myapp.controller('settings_controller', settings_controller);

/* settings_controller */
settings_controller.$inject = ['settings_service', 'connection_service', '$timeout', '$q', '$scope', '$rootScope', '$state'];
function settings_controller(settings_service, connection_service, $timeout, $q, $scope, $rootScope, $state){

	"use strict";
	var self = this;
	
	/* bindinds */
	self.settings_service = settings_service;
	self.connection_service = connection_service;
	self.state = "idle"; /* idle | connecting */
	
	self.defaults = defaults;
	self.connect = connect;

	
	/* defaults */
	function defaults() {
		self.settings_service.defaults();
		 self.port = settings_service.getPort();
	}
	
	
	/* connect */
	function connect() {
	
		console.log("connect")
		self.state = "connecting"
		
		/* fancy timer */
		var counter = 0
		self.onTimeout = function(){			

			counter++
			mytimeout = $timeout(self.onTimeout, 300);
			if (counter==1){
				$timeout.cancel(mytimeout);					
				timeout_connect()				
			}
		}

		var mytimeout = $timeout(self.onTimeout, 300);

		/* timeout_connect */
		function timeout_connect(){
		
			self.settings_service.connect()

				.then(function(response){			
					$state.go('dashboard', { reload: false });
					self.state = "idle"
				})
				
				.catch(function(response) {
					console.log("catch")
					self.state = "idle"
				})
		}
	}

	
	/* timer para siempre conectado */
    self.onTimeout = function(){
		self.settings_service.check()
        // mytimeout = $timeout(self.onTimeout, 5000);
    }
    
	// var mytimeout = $timeout(self.onTimeout, 5000);
	
	/* evento */
	$scope.$on('greeting', function(){$state.go("settings");})

    // $scope.stop = function(){
        // $timeout.cancel(mytimeout);
    // }
	
}
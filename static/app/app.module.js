var myapp = angular.module("backups", [
	'ngCookies', 
	'ui.router'	
]);


myapp.run(function($state) {

	$state.go("dashboard");

})



myapp.run(function($state, settings_service) {

	settings_service.defaultConnect()
		.catch(function(response) {
			$state.go('settings', { reload: true });
		})
	
	
})
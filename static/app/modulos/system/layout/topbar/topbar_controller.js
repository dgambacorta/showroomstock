myapp.controller('topbar_controller', topbar_controller);

topbar_controller.$inject = ['profiler_service'];

function topbar_controller(profiler_service) {
	
	"use strict";
	var self = this;
	
	// self.go = go;
	self.profiler_service = profiler_service;

}
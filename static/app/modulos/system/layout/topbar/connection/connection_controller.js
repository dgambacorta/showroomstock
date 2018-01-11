myapp.controller('connection_controller', connection_controller);

connection_controller.$inject = ['connection_service'];

function connection_controller(connection_service) {
	
	"use strict";
	var self = this;
	
	// self.go = go;
	self.connection_service = connection_service;

}
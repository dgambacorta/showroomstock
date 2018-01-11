myapp.factory("connection_service", connection_service);

/* connection_service */
connection_service.$inject = ['$http'];
function connection_service($http) {

	
	/* data */
	var data = {

		host: null,
		port: null,
		
		isConnected: false,
		version: "", 
		status: ""
		
	};

	
	/* _getStatus */
	function _getStatus() {	
	
		// /* get */
		// var http = {
			// url: 'http://' + data.host + ":" + data.port + "/system/status", 
			// method: "GET",
			// params: null,
			// headers: {'Content-Type': 'application/json, text/plain'}
		// }

		// /* request */		
		// $http(http).success(function (response, status, headers, config) {
		// // data.command.object.address.url}}

			// console.log(response)
			// console.log(response.document)
			// data.status = response.document
			
		// }).error(function (data, status, headers, config) {

			// console.log(data)
			
		// });
	}


  	/* return */
	return {
  		data: data,	
		
		getStatus: function(){
            return _getStatus();
        }
  	};

}
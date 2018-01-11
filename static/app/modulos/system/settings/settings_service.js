myapp.factory("settings_service", settings_service);

/* settings_service */
settings_service.$inject = ['$http', '$cookies', '$q', '$rootScope', 'connection_service'];
function settings_service($http, $cookies, $q, $rootScope, connection_service) {

	
	/* data */
	var data = {

		tryHost: null,
		tryPort: null,
	};
	

	/* _connect  */
	var _connect = function () {	

		connection_service.data.host = data.tryHost;
		connection_service.data.port = data.tryPort;

		var url = 'http://' + connection_service.data.host + ":" + connection_service.data.port + '/info';
		
		var deferred = $q.defer();
		$http.get(url)
		
			.success(function(response) { 
			
	
				connection_service.data.isConnected = true;
				connection_service.data.version = response.systeminfo.version;
				
				_saveConnection();
				connection_service.getStatus()
				$.Notification.notify('success','bottom right', 'Coneccion exitosa', 'Utilizando ' + connection_service.data.version)
				deferred.resolve();
				
			})
			
			.error(function(response) { 
			

				connection_service.data.isConnected = false;
				connection_service.data.version = "";
				deferred.reject();
			});
			
		return deferred.promise;

	}
	
	
	/* _check  */
	var _check = function () {

		var url = 'http://' + connection_service.data.host + ":" + connection_service.data.port + '/system/info?fields={"prefix":"firmware_version"}';
		
		var deferred = $q.defer();
		$http.get(url)
		
			.success(function(response) { 
				connection_service.data.isConnected = true;
				connection_service.data.version = response.firmware_version;
				deferred.resolve();
				
			})
			
			.error(function(response) { 
				connection_service.data.isConnected = false;
				connection_service.data.version = "";
				deferred.reject();
				$rootScope.$broadcast('greeting');
			});
			
			return deferred.promise;

	}
	
	
	/* _defaultConnect  */
	var _defaultConnect = function () {
	
		var deferred = $q.defer();
		
		data.tryHost = _getHost()
		data.tryPort = _getPort()

		_connect()
			
			.then(function() {
				deferred.resolve();
			})
			
			.catch(function(response) {
				deferred.reject();
			})
			
		return deferred.promise;

	}
	
	
	/* _saveConnection */
	var _saveConnection = function() {
		
		$cookies.put("backupserver_host", connection_service.data.host);
		$cookies.put("backupserver_port", connection_service.data.port);		
	}
	
	
	/* _defaults */
	var _defaults = function() {

		connection_service.data.host = _getDefaultHost()
		connection_service.data.port = _getDefaultPort()
		
		data.tryHost = connection_service.data.host;
		data.tryPort = connection_service.data.port;
	}
	
	
	/* _getHost */
	var _getHost = function () {

		/* hay kuki */
		if ($cookies.get('backupserver_host') != null) {
			return $cookies.get('backupserver_host');
		}
		
		/* no hay kuki */
		return _getDefaultHost();
		
	}
	

	/* _getDefaultHost */
	var _getDefaultHost = function () {	
		return location.hostname;		
	}

	
	/* _getDefaultPort */
	var _getDefaultPort = function () {	
		
		if (location.port==""){
			return 80;
		}
		
		return location.port;		

	}

	
	/* _getPort */
	var _getPort = function () {

		/* hay kuki */
		if ($cookies.get('backupserver_port') != null) {
			return $cookies.get('backupserver_port');
		}
		
		/* no hay kuki */
		return _getDefaultPort();
	}


  	/* return */
	return {
  		data: data,
		
		connect: function(){
			return _connect();
		},
		
		defaultConnect: function(){
			return _defaultConnect();
		},
		
		check: function(){
			return _check();
		},
		
		defaults: function(){
			return _defaults();
		},		
		
		getHost: function(){
			return _getHost();
		},		
		
		getPort: function(){
			return _getPort();
		}
		
  	};

}
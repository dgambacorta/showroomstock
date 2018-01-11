myapp.factory("dashboard_service", dashboard_service);
dashboard_service.$inject = ['$http', '$state', 'connection_service']; 

function dashboard_service($http, $state, connection_service) {

    var host = '169.254.254.20'
    var port = 5001;

	var data = {
        total_product:  {},
        total_sales:  {},
        sales_today:  {},
        low_stock_product:  {},
        products: [],
        filters: {
                  date : "0"
        }
	}


    var _dashboardUpdate = function () {

    var url = 'http://' + host + ':' + port + '/product/count';
    $http.get(url).success(function(response) {    
        data.total_product = response;
    }).error(function(response) {});


    var url = 'http://' + host + ':' + port + '/sale/count';
    $http.get(url).success(function(response) {  
        data.total_sales = response;
    }).error(function(response) {});	
    

    var url = 'http://' + host + ':' + port + '/sale/today';
    $http.get(url).success(function(response) {  
       data.sales_today = response;
    }).error(function(response) {});
    

    var url = 'http://' + host + ':' + port + '/product/lowstock';
    $http.get(url).success(function(response) {  
       data.low_stock_product = response;
    }).error(function(response) {});

       

    var url = 'http://' + host + ':' + port + '/product/all';
    $http.get(url).success(function(response) {  
       data.products = response;
       console.log(response);
    }).error(function(response) {});

    }


	return {

		data: data,
        dashboardUpdate: function(){
            return _dashboardUpdate();
        }

    };

}
myapp.factory("dashboard_service", dashboard_service);
dashboard_service.$inject = ['$http', '$state', 'connection_service']; 

function dashboard_service($http, $state, connection_service) {

    var host = '169.254.254.20'
    var port = 5001;

    var product = {
        order: {},
        category:  {},
        name:  {},
        stock:  {},
        input_date:  {},
        buy_price:  {},
        sale_price:  {},
        photo:  {},
        stock_limit:  {}

    }

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

        var arrayLengthTotal = response.length;

        data.products = [];
        product = [];

        for (var i = 0; i < arrayLengthTotal; i++) {


            product.order = i+1;
            product.category = response[i][0];
            product.name = response[i][1];
            product.stock = response[i][2];
            product.input_date = response[i][3];
            product.buy_price = response[i][4];
            product.sale_price = response[i][5];
            product.photo = response[i][6];
            product.stock_limit= response[i][7];

            data.products.push(product);

        }




    }).error(function(response) {});

    }


	return {

		data: data,
        dashboardUpdate: function(){
            return _dashboardUpdate();
        }

    };

}
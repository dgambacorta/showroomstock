myapp.config(function($stateProvider, $urlRouterProvider){

	"use strict";
	
	$stateProvider

	/* dashboard */
	var dashboard = {
		name: 'dashboard',
		url: '/dashboard',
		templateUrl: 'app/modulos/dashboard/dashboard_view.html'
	}

	var client = {
		name: 'client',
		url: '/client',
		templateUrl: 'app/modulos/client/client_view.html'
	}

	var product = {
		name: 'product',
		url: '/product',
		templateUrl: 'app/modulos/product/product_view.html'
	}

	var sale = {
		name: 'sale',
		url: '/sale',
		templateUrl: 'app/modulos/sale/sale_view.html'
	}
	

	var category = {
		name: 'category',
		url: '/category',
		templateUrl: 'app/modulos/category/category_view.html'
	}
	
	/* home */
	var home = {
		name: 'home',
		url: '/home',
		templateUrl: 'app/modulos/home/home_view.html'
	}
	
	/* settings */
	var settings = {
		name: 'settings',
		url: '/settings',
		templateUrl: 'app/modulos/system/settings/settings_view.html'
	}
	
	/* states */
	$stateProvider.state(dashboard);
	$stateProvider.state(home);
	$stateProvider.state(category);
	$stateProvider.state(product);
	$stateProvider.state(sale);
	$stateProvider.state(client);
	//$stateProvider.state(settings);
	
});
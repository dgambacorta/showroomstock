myapp.factory("dashboard_service", dashboard_service);
dashboard_service.$inject = ['$http', '$state', 'connection_service']; 

function dashboard_service($http, $state, connection_service) {

	var data = {
		stats: {},
		storage: {},
        totals_today:  {},
        totals_last_month:  {},
        totals_last_week:  {},
		records: [],
        filters: {
                  date : "0"
        }
	}


	function filter(type) {

		var dateFilter = '';
		var dateFrom = '';
		var dateTo = '';

		var today = new Date();
        today.setDate(today.getDate() + 1);
		today = today.toISOString().slice(0,10).replace(/-/g,"");

		if (type == 1){ //today        
			var yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			yesterday = yesterday.toISOString().slice(0,10).replace(/-/g,"");
			dateFilter='&dateFrom='+yesterday+'&dateTo='+today;
		}

		if (type == 2){ //yesterday 
			var yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			var yesterdayF = yesterday.toISOString().slice(0,10).replace(/-/g,"");
			var preYesterday = new Date();
			preYesterday.setDate(preYesterday.getDate() - 2);
			var preYesterdayF = preYesterday.toISOString().slice(0,10).replace(/-/g,"");
			dateFilter='&dateFrom='+preYesterdayF+'&dateTo='+yesterdayF;        
		}

		if (type == 3){ //last 7 days
			var last7 = new Date();
			last7.setDate(last7.getDate() - 7);
			last7 = last7.toISOString().slice(0,10).replace(/-/g,"");
			dateFilter='&dateFrom='+last7+'&dateTo='+today;			
		}

		if (type == 4){ //last 30 days
			var last30 = new Date();
			last30.setDate(last30.getDate() - 30);
			last30 = last30.toISOString().slice(0,10).replace(/-/g,"");
			dateFilter='&dateFrom='+last30+'&dateTo='+today;
		}

		if (type == 5){ //this month
			var month = rightNow.getMonth()+1;
			var year = rightNow.getFullYear();
			dateFilter='&dateFrom='+year+month+'01'+'&dateTo='+today;
		}

		if (type == 6){ //last month
			var last30 = new Date();
			last30.setDate(last30.getDate() - 30);
			var month = last30.getMonth()+1;
			var year = last30.getFullYear();
			dateFilter='&dateFrom='+year+month+'01'+'&dateTo='+year+month+'30';
		}

		return dateFilter;
    }


	/* _dashboardUpdate */
	var _dashboardUpdate = function () {
	
        var dateFilterUrl = filter(data.filters.date);			
		var hostname = connection_service.data.host;
		var port = connection_service.data.port;
		
        var url = 'http://' + hostname + ':' + port + '/printers?unwind=1';
        var printerInfo = '';

        $http.get(url).success(function(response) {
            printerInfo = response;
        }).error(function(response) {});

		/* stats */
		var url = 'http://' + hostname + ':' + port + '/stats';
		$http.get(url).success(function(response) {
			data.stats = response;
		}).error(function(response) {});

       
        var url = 'http://' + hostname + ':' + port + '/backups/companies/2/cl?groupBy=YMD&orderDir=DESC';// + dateFilterUrl;
        $http.get(url).success(function(response) {

            data.backups = response;
            var total_records = [];
            var total_backups = [];
            var total_elapsedTime = [];

            var count = 0
            var limit = 36
            for (var x in data.backups ){
            
                if (data.backups[x].total_records != 0){
                    total_records.push(data.backups[x].total_records)				
				}

                total_backups.push(data.backups[x].total_backups)

                if (count < limit){
                    total_elapsedTime.push(data.backups[x].elapsed_time_total)				
				}

				count = count + 1

            }

            // chart total records serie I
			$('#chart_total_records').sparkline(total_records, {
                type: 'line',
                width:'100%',
                tooltipPrefix: 'Records: ',
                height: '165',
                chartRangeMax: 50,
                lineColor: '#3bafda',
                fillColor: 'rgba(59,175,218,0.3)',
                highlightLineColor: 'rgba(0,0,0,.1)',
                highlightSpotColor: 'rgba(0,0,0,.2)',
                
            });

            // chart total records serie II
            $('#chart_total_records').sparkline(total_backups, {
                type: 'line',
                width:'100%',
                height: '165',
                tooltipPrefix: 'Backups: ',
                chartRangeMax: 40,
                lineColor: '#5d9cec',
                fillColor: 'rgba(93, 156, 236, 0.3)',
                composite: true,
                highlightLineColor: 'rgba(0,0,0,.1)',
                highlightSpotColor: 'rgba(0,0,0,.2)',

            });

            // chart elapsed time
            $('#chart_elapsed_time').sparkline(total_elapsedTime, {
                type: 'bar',
                height: '165',
                barWidth: '10',
                barSpacing: '3',
                barColor: '#3bafda'
            });


	        // chart total (circlifull)
			$('.circliful-chart').empty();
			$('.circliful-chart').circliful();



           
          // $.plot($("#flotRealTime"), total_records, ['#3bafda']);

       
           // var plot = FlotChart.prototype.createRealTimeGraph('#flotRealTime', total_records, ['#3bafda']);
          // plot.draw();


        }).error(function(response) {});


        /* Logs */
		var url = 'http://' + hostname + ':' + port + '/backups/companies/2/cl/records?orderBy=YM&orderDir=ASC&limit=10';//+dateFilterUrl;

        $http.get(url)
		
			.then(function(response){		
			
				var logs = response.data;
				var records = []; 
				var order = 0;
				for (var x in logs ){
				
					var record = [];
                    if (logs[x]._id.records > 0 ){
					order++;

					record['order'] = order;
					record['records'] = logs[x]._id.records;
					record['elapsed_time'] = logs[x]._id.elapsed_time;
					record['creation_date'] =  logs[x]._id.creation_date;
					record['creation_date'] =  new Date(record['creation_date']);
					record['printerId'] = logs[x]._id.printerId;

					for (var pp in printerInfo){
						if(printerInfo[pp].printerId ==  record['printerId']){
							record['printerModel'] = printerInfo[pp].printerModel;
							record['companyName'] = printerInfo[pp].companyName;
							record['storeName'] = printerInfo[pp].storeName;
						}
					}
					records.push(record);
				}
            }

				//data.backups.logs = records;
				data.logs = records;

          
        })
		
		.catch(function(response){});

        /* records */
		var url = 'http://' + hostname + ':' + port + '/records';
        var opa = $http.get(url)
			.then(function(response){		

				data.records = response.data;

				var order=0;
				for (var x in data.records){
					
					order++;
					data.records[x].order = order;
                    var rec_type = data.records[x]['@rec_type'].substr(12).replace("_"," ");
                    data.records[x].rec_type = rec_type.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                   
                    for (var pp in printerInfo){
                        if(printerInfo[pp].printerId ==  data.records[x].printerId){
                            data.records[x].companyName = printerInfo[pp].companyName;
                            data.records[x].storeName = printerInfo[pp].storeName;

                        }
                    }
                    data.records[x].creation_date = new Date(data.records[x].creation_date);
				}
			})
			.catch(function(response) {});


		/* storage */
		var url = 'http://' + hostname + ':' + port + '/storage';
		$http.get(url).success(function(response) {

			data.storage = response;
            var free = data.storage.Storage.free / 1024 / 1024 / 1024;
            var used = data.storage.Storage.used / 1024 / 1024 / 1024;
            free = (Math.round(free*100)/100);
            used = (Math.round(used*100)/100);           

            $('#chart_disk_apsce').sparkline([free, used], {
                type: 'pie',
                width: '165',
                height: '165',
                sliceColors: ['#dcdcdc', '#3bafda', '#00b19d']
            });

		}).error(function(response) {});

        /* Totals */

        /* Today  */
        var today_filter = filter(1);
        var url = 'http://' + hostname + ':' + port + '/backups/companies/2/cl/records?orderBy=YMD'+today_filter;

        $http.get(url).success(function(response) {
            data.totals_today = response;            
            var records = 0;
            var elapsed = 0;
            for (var x in data.totals_today ){
                records = records + data.totals_today[x]._id.total_records;
                elapsed = elapsed + data.totals_today[x]._id.elapsed_time;     
            }
            data.totals_today.records = records;
            data.totals_today.elapsed_time = elapsed;     
        }).error(function(response) {});

        /* Last Week  */
        var last_week_filter = filter(3);
        var url = 'http://' + hostname + ':' + port + '/backups/companies/2/cl/records?orderBy=YMD'+last_week_filter;
        $http.get(url).success(function(response) {

            data.totals_last_week = response;            
            var records = 0;
            var elapsed = 0;
            for (var x in data.totals_last_week ){
                records = records + data.totals_last_week[x]._id.total_records;
                elapsed = elapsed + data.totals_last_week[x]._id.elapsed_time;   
            }
            data.totals_last_week.records = records;
            data.totals_last_week.elapsed_time = elapsed;   

        }).error(function(response) {});

         /* Last Month  */
        var last_month_filter = filter(4);
        var url = 'http://' + hostname + ':' + port + '/backups/companies/2/cl/records?orderBy=YMD'+last_month_filter;
        $http.get(url).success(function(response) {
            data.totals_last_month = response;            
            var records = 0;
            var elapsed = 0;
            for (var x in data.totals_last_month ){
                records = records + data.totals_last_month[x]._id.total_records;
                elapsed = elapsed + data.totals_last_month[x]._id.elapsed_time;
            }
            data.totals_last_month.records = records;
            data.totals_last_month.elapsed_time = elapsed;  
        }).error(function(response) {});



	}

	/* ----- 



    */

	return {

		data: data,
		dashboardUpdate: function(){
			return _dashboardUpdate();
		}

    };

}
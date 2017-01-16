
var market = require('discogs-marketplace-js');

var id_params = {
	//id: "1067610",
	//type: "release",
	id: "3777",
	type: "master",
	//filters: filter_params,
	pagination: {
		page: 1,
		per_page: 25,
		sort: "Price Lowest Highest"
	}
};

var test_print = function(data){
	console.log(data.pagination.page);
}

var get_page = function(page, params, callback){
	console.log("p"+page);
	params.pagination.page = page;
	console.log("pp"+params.pagination.page);
	market.searchByID(params, function(result){
		return callback(result);
	})
}

//DMS.searchByID(id_params, test_print);
function process(params, callback){

	var pages = new Array();

	market.searchByID(params,function(result){
		var items = result.pagination.items;
		var pages_processed = 0;
		items -= 25;
		var page_count = Math.ceil(items/25);
		//console.log(page_count);
		pages.push(result.listing);
		console.log("Pages left= " + page_count);

		for(var i=2, counter = page_count+1; i <= counter; i++){
			(function(i, params) {
				params.pagination.page = i;
				market.searchByID(params, function(result){
					pages.push(result.listing);
					pages_processed++;
					console.log("processed " + pages_processed);
					if(pages_processed == page_count){
						return callback(pages);
					}
				});
			})(i, params);
		}
	});

	//console.log(page_count);
}

process(id_params, function(result){
	console.log("success"+result.length);
	console.log(result);
});
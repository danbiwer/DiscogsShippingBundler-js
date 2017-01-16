var market = require('discogs-marketplace-js');
var discogs = module.exports = {};

//DMS.searchByID(id_params, test_print);
discogs.process_params = function(params, callback){

	var pages = new Array();

	market.searchByID(params,function(result){
		var items = result.pagination.items;
		var pages_processed = 0;
		items -= 25;
		var page_count = Math.ceil(items/25);
		pages.push(result.listing);

		for(var i=2, counter = page_count+1; i <= counter; i++){
			(function(i, params) {
				params.pagination.page = i;
				market.searchByID(params, function(result){
					pages.push(result.listing);
					pages_processed++;
					if(pages_processed == page_count){
						return callback(pages);
					}
				});
			})(i, params);
		}
	});
}
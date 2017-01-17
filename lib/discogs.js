var market = require('discogs-marketplace-js');
var discogs = module.exports = {};

//DMS.searchByID(id_params, test_print);
discogs.process_params = function(params, callback){

	var pages = new Array();
	var seller_inventory = new Object();

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
					discogs.process_page(result.listing, seller_inventory);
					pages_processed++;
					if(pages_processed == page_count){
						return callback(seller_inventory);
					}
				});
			})(i, params);
		}
	});
}

discogs.process_page = function(page, list){
	for(var i=0; i < page.length; i++){
		var seller = page[i].seller;
		//console.log(seller);
		if(list[seller] == null){
			list[seller] = new Array();
			list[seller].push(page[i]);
		}
		else
			list[seller].push(page[i]);
	}
}

discogs.sort = function(lists){

}
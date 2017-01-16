var discogs = require('./lib/discogs.js')

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

discogs.process_params(id_params, function(result){
	console.log("success"+result.length);
	console.log(result);
});
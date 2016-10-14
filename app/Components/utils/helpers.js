// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";



// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to find the news information. 
	runQuery: function(topic, begin_date, end_date){

		console.log(topic);

		//Figure out the geolocation
		var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?query=" + topic + authKey + "&begin_date"+begin_date + "&end_date"+end_date; 
		//=20040101&end_date=20060101&api-key=9d4a8986921972b65754ea0809d47c84%3A12%3A74623931" + geocodeAPI;

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response.data.results[0].formatted;
		})

	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(location){

		return axios.post('/api', {location: location})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}
// On Click button associated with the Search Button
	$('#runSearch').on('click', function(){

		// Initially sets the articleCounter to 0
		articleCounter = 0;

		// Empties the region associated with the articles
		$("#wellSection").empty();

		// Search Term
		var searchTerm = $('#searchTerm').val().trim();
		queryURL = queryURLBase + searchTerm;

		// Num Results
		numResults = $("#numRecordsSelect").val();

		// Start Year
		startYear = $('#startYear').val().trim();

		// End Year
		endYear = $('#endYear').val().trim();

		// If the user provides a startYear -- the startYear will be included in the queryURL
		if (parseInt(startYear)) {
			queryURL = queryURL + "&begin_date=" + startYear + "0101";
		}

		// If the user provides a startYear -- the endYear will be included in the queryURL
		if (parseInt(endYear)) {
			queryURL = queryURL + "&end_date=" + endYear + "0101";
		}

		// Then we will pass the final queryURL and the number of results to include to the runQuery function
		runQuery(numResults, queryURL);

		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;
	});	

// We export the helpers function 
module.exports = helpers;
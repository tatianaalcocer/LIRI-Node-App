// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
//Then store the keys in a variable.


var request = require('request');
var Twitter = require('twitter');
var keys = require('./key.js');


var command = process.argv[2];
var specific = process.argv[3];


switch(command){
    case 'my-tweets':
        twitter();
    break;

    case 'spotify-this-song':
        spotify();
    break;

    case 'movie-this':
        omdb();
    break;

    case 'do-what-it-says':
        itSaysWhat();
    break;
}
// Twitter Request ========================================================
// This will show your last 20 tweets and when they were created at in your 
// terminal/bash window.

function twitter() {

	var twitterClient = new Twitter(keys.twitterKeys);

	// twitterClient.get(path, params, callback);

	var params = {
		screen_name: 'DevinUnlimited',
		count: 20,
		exclude_replies: true
	};

	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) throw error;

		console.log("TWEETS");
		for(var i in tweets) {
			console.log(tweets[i].text);
		}

		var twitterUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=DevinUnlimited&count=20&exclude_replies=true'
		// console.log(tweets);  
		// console.log(response);  // Raw response object. 

	});

	twitterClient.get('https://api.twitter.com/1.1/statuses/user_timeline.json', 'screen_name=DevinUnlimited&count=20&exclude_replies=true', function(response) {
		console.log(response)
	});
}


// Spotify Request ========================================================
// node liri.js spotify-this-song '<song name here>'

// This will show the following information about the song in your terminal/bash 
// window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to
// "The Sign" by Ace of Base



// OMDB Request ===========================================================
// Displays movie information to terminal/bash window:
// node liri.js movie-this '<movie name here>'

function omdb() {
	var movieName = "mr+nobody";

	// Allowing movie titles with spaces in the name
	for (var i=3; i < process.argv.length; i++) {
		var movieName = "";
		var movieName = movieName + "+" + process.argv[i];
	}
	

	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&tomatoes=true&r=json';
	console.log(queryUrl);

	request(queryUrl, function (error, response, body) {

		// If the request is successful 
		if (!error && response.statusCode == 200) {
			
			// Then log the Release Year for the movie
			console.log(JSON.parse(body)["Title"]);
			console.log("This movie came out in " + JSON.parse(body)["Released"]);
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
			console.log("This movie was produced in " + JSON.parse(body)["Year"]);
			console.log("This movie was produced in " + JSON.parse(body)["Country"]);
			console.log("This movie was produced in " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Featuring: " + JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes: " + JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		}
	});

}

// Do What It Says =============================================================
// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt 
// and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text 
// in random.txt.
// Feel free to change the text in that document to test out the feature for 
// other commands.





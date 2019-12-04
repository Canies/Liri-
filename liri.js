var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

require("dotenv").config();
var start = function (liriSearch, query) {
    console.log(liriSearch, query)
    switch (liriSearch) {
        case "concert-this":
            console.log("concert", query)
            break;
        case "spotify-this-song":
            player()
            console.log("spotify", query)
            break;
        case "movie-this":
            searchMovies()
            console.log("movie", query)
            break;
        case "do0wht-it-is":
            moment()
            console.log("text", query)
            break;
        default:
            console.log("You didn't ask me anything I can help you with.")
            break;
    }
}
start(process.argv[2], process.argv[3])

function player() {
    console.log(process.env.SPOTIFY_ID)
    console.log(process.env.SPOTIFY_SECRET)
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (let index = 0; index < data.tracks.items.length; index++) {
            console.log("Artist Name:", data.tracks.items[index].artists[0].name)
            console.log("Song Name:", data.tracks.items[index].name)
            console.log("Preview Link:", data.tracks.items[index].preview_url)
            console.log("Album:", data.tracks.items[index].album.name)
            console.log("________________________________________________")

        }

    });
}

function searchMovies() {
    console.log("movie-this");
    var movieName = process.argv[4];
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
       
    function (response) {
            console.log("Title:", response.data.Title);
            console.log("Year:", response.data.Year);
            console.log("IMDB Rating:", response.data.Ratings[0].Value);

            console.log("Country Produced:", response.data.Country);
            console.log("Language:", response.data.Langauge);
            console.log("Plot:", response.data.Plot);
            console.log("Actors:", response.data.Actors);
            console.log("__________________________________________________");
       
        }
        
    )
    
}

// axios.search({ type: 'track', query: process.argv[3] }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     });

// function concert() {
    
// }

function getConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log("Name of Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
            console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YY"));
        })
    .catch(function(error) {
        axiosErr(error);
    });
};

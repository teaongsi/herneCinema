import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

// Load data from environment variables
const yourAPIKeyTMDB = process.env.APIKEYTMDB;
const baseURLTMDB = process.env.BASE_URL || 'https://api.themoviedb.org/3/';
const yourAPIKeyOMDB = process.env.APIKEYOMDB;
const baseURLOMDB = process.env.BASE_URL || 'http://www.omdbapi.com/';

const configTMDB = { 
    params: {
        with_original_language: "ne",
        api_key: yourAPIKeyTMDB
    }
};

// Middleware to log request details
app.use( (req, res, next) => {
    console.log(`Request Method: ${req.method}\nRequest URL: ${req.url}\nRequest Time: ${new Date().toISOString()}`);
    next();
});

// Endpoint 1: Homepage
app.get("/", (req, res) => {
  res.render("home.ejs");
});

//Endpoint 2: Random Nepali Movie
app.get("/random", async (req, res) => {
  try {
    //Filter movies from Nepal
    const response = await axios.get(baseURLTMDB + "discover/movie", configTMDB);
    const movies = response.data.results;

    //Select a random movie from the filtered list
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    // Fetch movie credits from TMDB API
    const credits = await axios.get(baseURLTMDB + "movie/" + randomMovie.id + "/credits", {
        params: {
            api_key: yourAPIKeyTMDB
        }
    });

    //Fetch detailed info about the random movie from TMDB API
    const movieDetailsTMDB = await axios.get(baseURLTMDB + "movie/" + randomMovie.id, {
        params: {
            api_key: yourAPIKeyTMDB
        }
    });

    const imdbId = movieDetailsTMDB.data.imdb_id;

    if (!imdbId) {
      return res.status(404).send("IMDb ID not found for this movie");
    }

    //Fetch detailed movie info from OMDB API using IMDB Id
    const movieDetailsOMDB = await axios.get(baseURLOMDB, {
      params: {
        i: imdbId,
        apikey: yourAPIKeyOMDB
      }
    });

    //render index.ejs and pass the movie details
    res.render("index.ejs", { movieTMDB: movieDetailsTMDB.data, movieOMDB: movieDetailsOMDB.data , credit: credits.data });

  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
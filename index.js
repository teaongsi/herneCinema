import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

const yourAPIKey = process.env.APIKEY;
const baseURL = process.env.BASE_URL || 'https://api.themoviedb.org/3/';

const config = { 
    params: {
        with_original_language: "ne",
        api_key: yourAPIKey
    }
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(baseURL + "discover/movie", config);
    const movies = response.data.results;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    res.render("index.ejs", { movie: randomMovie });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
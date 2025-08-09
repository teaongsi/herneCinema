# herneCinema
A simple website that gives you a random nepali film

This is a Node.js Express app that fetches a random Nepali movie from TMDb (The Movie Database) and displays its details, including ratings from OMDb(Open Movie Database).

## Features

- Gets a random Nepali movie using TMDb's Discover API.
- Fetches detailed movie info from TMDb (including director and cast).
- Retrieves external ratings from OMDb using the movie's IMDb ID.
- Displays movie poster, overview, ratings, runtime, genres, director, and top 4 cast members.

## Prerequisites

- Node.js 
- TMDb API key — [Get one here](https://www.themoviedb.org/documentation/api)
- OMDb API key — [Get one here](http://www.omdbapi.com/apikey.aspx)

## Setup

1. Clone this repository.
2. Create a `.env` file in the root folder
3. Install dependencies: ` npm i `
4. Run the app: ` node index.js `
5. Open `http://localhost:8000`
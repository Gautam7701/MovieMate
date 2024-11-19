import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import searchIcon from "./serch.svg"
import MovieCard from './Components/MovieCard'
import './App.css'

const API_URL = "https://omdbapi.com?apikey=d874dbfd";
// d874dbfd

const movie1 =
{
  "Title": "Spiderman and Grandma",
  "Year": "2009",
  "imdbID": "tt1433184",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg"
}

function App() {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setmovies(data.Search);

  }
  const [movies, setmovies] = useState([])
  const [searchTerm, setsearchTerm] = useState("")
  useEffect(() => {
    searchMovies("Spiderman")
  }, [])

  return (
    <>
      <div className="app">
        <h1>Moviemate</h1>

        <div className="moving-text">
          <span>Moviemate</span>
        </div>

        <div className="search">
          <input type="text"
            placeholder='Search for Movies'
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchMovies(searchTerm);
              }
            }}
          />
          <img src={searchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
        </div>

        {
          movies?.length > 0
            ? (
              <div className="container">
                {movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No Movies found</h2>
              </div>
            )
        }

      </div>
    </>
  )
}

export default App

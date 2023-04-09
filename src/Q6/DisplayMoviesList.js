import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

export function DisplayMoviesList() {
  const [movieList, setMovieList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const getMovieList = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/movies");
      if (response.status === 200) {
        setMovieList(response.data);
        setDisplayList(response.data);
      }
    } catch (error) {}
  };

  const allGenres = movieList.reduce((acc, curr) => {
    if (acc.includes(curr.genre)) {
      return acc;
    } else {
      return [...acc, curr.genre];
    }
  }, []);

  useEffect(() => {
    getMovieList();
  }, []);

  const genreHandler = (event) => {
    const selectedGenre = event.target.value;

    if (selectedGenre === "all") {
      setDisplayList(movieList);
    } else {
      const filteredList = movieList.filter(
        (movie) => movie.genre === selectedGenre
      );
      setDisplayList(filteredList);
    }
  };

  return (
    <>
      <h1>Question 6</h1>
      <label>
        Filter By Genre
        <select onChange={genreHandler}>
          <option value="all">All</option>
          {allGenres.map((genre) => (
            <option value={genre}>{genre}</option>
          ))}
        </select>
      </label>
      <ul>
        {displayList.map(({ title, year, genre }) => (
          <li>
            <p>{title}</p>
            <p>{year}</p>
            <p>{genre}</p>
            <br></br>
          </li>
        ))}
      </ul>
    </>
  );
}

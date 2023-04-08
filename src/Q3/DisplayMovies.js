import { useEffect, useState } from "react";
import { fakeFetch1 } from "./fakeFetch1";

export function DisplayMovies() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const getMoviesData = async () => {
    try {
      const response = await fakeFetch1("https://example.com/api/movies");
      if (response.status === 200) {
        setFilteredMovies(response.data);
        setMovieDetails(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  const changeHandler = (e) => {
    const selectedYear = e.target.value;
    if (selectedYear === "all") {
      {
        setFilteredMovies(movieDetails);
      }
    } else {
      const filteredList = movieDetails.filter(
        (movie) => movie.year === Number(selectedYear)
      );
      setFilteredMovies(filteredList);
    }
  };
  return (
    <>
      <h1>Question 3</h1>
      <select onChange={changeHandler}>
        <option value="all">All</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2007">2007</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
      </select>
      <ul style={{ textAlign: "left" }}>
        {filteredMovies.map(({ title, year, rating }) => (
          <li key={title}>
            <p>{title}</p>
            <p>{year}</p>
            <p>{rating}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

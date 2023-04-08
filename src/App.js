import logo from "./logo.svg";
import "./App.css";
import { DisplayWeather } from "./Q1/DisplayWeather";
import { DisplayUserData } from "./Q2/DisplayUserData";
import { fakeFetch } from "./Q1/fakeFetch";
import { DisplayMovies } from "./Q3/DisplayMovies";

function App() {
  return (
    <div className="App">
      <DisplayWeather />
      <DisplayUserData />
      <DisplayMovies />
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { DisplayWeather } from "./Q1/DisplayWeather";
import { DisplayUserData } from "./Q2/DisplayUserData";
import { DisplayMovies } from "./Q3/DisplayMovies";
import { UserDetails } from "./Q4/UserDetails";
import { RandomQuotes } from "./Q5/RandomQuotes";
import { DisplayMoviesList } from "./Q6/DisplayMoviesList";
import { DisplayProducts } from "./Q7,8/DisplayProducts";
import { useEffect, useState } from "react";

const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/products") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            products: [
              { name: "Color Pencils", price: 50, quantity: 40, rating: 4.5 },
              { name: "Sketchpens", price: 110, quantity: 20, rating: 3.8 },
              { name: "Eraser", price: 20, quantity: 20, rating: 4.2 },
              { name: "Sharpener", price: 22, quantity: 30, rating: 4.7 },
            ],
          },
        });
      } else {
        reject({
          status: 404,
          message: "Product list not found.",
        });
      }
    }, 2000);
  });
};

function DisplayStationary() {
  const [stationaryProducts, setStationaryProoducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const getStationaryData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      if (response.status === 200) {
        setStationaryProoducts(response.data.products);

        setSortedProducts(
          [...response.data.products].sort((a, b) =>
            a.price > b.price ? -1 : 1
          )
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getStationaryData();
  }, []);

  const changeHandler = (event) => {
    const selectedItem = event.target.value;
    if (selectedItem) {
      const selectedListOfItems = stationaryProducts.filter((product) =>
        product.name.toUpperCase().includes(selectedItem.toUpperCase())
      );
      setSortedProducts(selectedListOfItems);
    } else {
      setSortedProducts(
        [...stationaryProducts].sort((a, b) => (a.price > b.price ? -1 : 1))
      );
    }
  };
  return (
    <>
      <h1>Question 9,10</h1>
      <input onChange={changeHandler} type="text" />
      {sortedProducts.map(({ name, price, quantity, rating }) => (
        <div>
          <h4>{name}</h4>
          <p>Rs: {price}</p>
          <p>Quantity: {quantity}</p>
          <p>Rating: {rating}</p>
          <br />
        </div>
      ))}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <DisplayWeather />
      <DisplayUserData />
      <DisplayMovies />
      <UserDetails />
      <RandomQuotes />
      <DisplayMoviesList />
      <DisplayProducts />
      <DisplayStationary />
    </div>
  );
}

export default App;

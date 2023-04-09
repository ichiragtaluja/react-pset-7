import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

export function DisplayProducts() {
  const [productDetails, setProductDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);

  const getProductDetails = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      if (response.status === 200) {
        setProductDetails(response.data.products);
        setFilteredDetails(response.data.products);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const clickHandler = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Sort By Price" || selectedValue === "Low To High") {
      const sortedProductDetails = [...productDetails].sort(
        (a, b) => a.price - b.price
      );
      setFilteredDetails(sortedProductDetails);
    } else if (selectedValue === "High To Low") {
      const sortedProductDetails = [...productDetails].sort((a, b) =>
        a.price > b.price ? -1 : 1
      );
      setFilteredDetails(sortedProductDetails);
    } else {
      setFilteredDetails(productDetails);
    }
  };

  return (
    <>
      <h1>Question 7</h1>
      <h3>Products</h3>
      <button value="Sort By Price" onClick={clickHandler}>
        Sort By Price
      </button>
      <button value="Low To High" onClick={clickHandler}>
        Low To High
      </button>
      <button value="High To Low" onClick={clickHandler}>
        High To Low
      </button>
      <button value="Reset" onClick={clickHandler}>
        Reset
      </button>
      <ul>
        {filteredDetails.map(({ name, description, price, quantity }) => (
          <li>
            <h4>{name}</h4>
            <p>{description}</p>
            <p>$ {price}</p>
            <p>Quantity: {quantity}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

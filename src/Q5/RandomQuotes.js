import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

export function RandomQuotes() {
  const [quotes, setQuotes] = useState({});

  const getQuotes = async () => {
    try {
      const response = await fakeFetch();
      // console.log(response);
      setQuotes(response);
    } catch (error) {}
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const clickHandler = () => {
    getQuotes();
  };
  return (
    <>
      <h1>Question 5</h1>
      <p>{quotes.content}</p>
      <p>-{quotes.author}</p>
      <button onClick={clickHandler}>New Quote</button>
    </>
  );
}

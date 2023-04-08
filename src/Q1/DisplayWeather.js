import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch";

export function DisplayWeather() {
  const [weatherData, setWeatherData] = useState({});
  const [displayWeatherData, setDisplayWeatherData] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/weather");
      if (response.status === 200) {
        setWeatherData(response.data);
        setDisplayWeatherData(response.data);
      }
    } catch (error) {}
  };

  const buttonHandler = () => {
    console.log("hi");
    setIsFahrenheit(!isFahrenheit);
    if (!isFahrenheit) {
      let temp = weatherData.temperature;
      temp = (temp * 9) / 5 + 32;
      console.log(temp);
      setDisplayWeatherData({ ...weatherData, temperature: temp });
    } else {
      setDisplayWeatherData({ ...weatherData });
    }
  };
  return (
    <>
      <h1>Question 1</h1>
      <h3>Weather</h3>
      <p>
        Temperature: {displayWeatherData.temperature}{" "}
        {!isFahrenheit ? "degree celcius" : "fahrenheit"}
      </p>
      <p>Humidity: {displayWeatherData.humidity} %</p>
      <p>Wind Speed: {displayWeatherData.windSpeed} km/hr</p>
      <button onClick={buttonHandler}>
        {!isFahrenheit ? "Switch to Fahrenheit" : "Switch to Celcius"}
      </button>
    </>
  );
}

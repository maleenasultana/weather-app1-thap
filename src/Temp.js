import React, { useState, useEffect } from "react";
import Weathercard from "./Weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Mumbai");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      //let url = `https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.88&hourly=temperature_2m,pressure_msl,visibility,windspeed_10m&daily=sunset,precipitation_sum,rain_sum&start_date=2023-02-13&end_date=2023-02-14`;

      let res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.88&hourly=temperature_2m,pressure_msl,visibility,windspeed_10m&daily=sunset,precipitation_sum,rain_sum&start_date=2023-02-13&end_date=2023-02-14`);
      let data = await res.json();

      const { temperature, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { windspeed } = data.windspeed;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temperature,
        humidity,
        pressure,
        weathermood,
        name,
        windspeed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;
import React from "react";

function WeatherIconIndicate({ icon }) {
  return (
    <div className="relative h-20 w-20">
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt="weather-icon"
        width={100}
        height={100}
        className="absolute h-full w-full
        "
      />
    </div>
  );
}

export default WeatherIconIndicate;

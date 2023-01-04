import React from "react";

function Home() {
  return (
    <div className="col-md-7 col-sm-7 middle-col p-5">
      <div className="d-flex flex-column px-4">
        <div className="row dashboard shadow-sm">
          <div className="col-md-12 text-center p-5">
            <p className="blockquote m-0">Welcome</p>
            <p className="blockquote m-0">to</p>
            <img className="logo-home" src="../weather-icons/Logo.png" alt="Weather" ></img>
            <br></br>
            <br></br>
            <p className="blockquote">
              Access current weather data for any location on Earth including
              over 200,000 cities!. 5 day forecast is available at any location
              on the globe. It includes weather forecast data with 3-hour step.
            </p>
            <p className="text-muted">Go to Dashboard and Type your city name in Search box</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

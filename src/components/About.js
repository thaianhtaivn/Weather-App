import React from 'react'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { UilHtml5, UilCss3Simple, UilJavaScript, UilBold, UilGithub } from '@iconscout/react-unicons'

function About() {
  return (
    <div className="col-md-7 col-sm-7 middle-col p-5">

      <div className="d-flex flex-column px-4">

        <div className="row dashboard bg-blue text-white shadow-sm p-3">
          <h5 className="m-0">About</h5>
        </div>

        <div className="about-dashboard row dashboard shadow-sm p-5 bg-light">
          <h6>What is Weather?</h6>
          <ul className="about-dashboard-ul px-5">

            <li>Weather is a web app for searching current weather data and forecast</li>
            <li>we can check weather forecast for upcoming 5 days and can check hourly forecast also.</li>
          </ul>

          <h6>Technologies</h6>

          <p className="row mx-2">
            <span className="technologies col-2 py-2 my-1 mx-2 rounded w-auto"><UilReact size="30" color="#61DBFB" /> React</span>
            <span className="technologies col-2 py-2 my-1 mx-2 rounded w-auto"><UilHtml5 size="30" color="#F06529" /> Html</span>
            <span className="technologies col-2 py-2 my-1 mx-2 rounded w-auto"><UilCss3Simple size="30" color="#2965F1" /> Css</span>
            <span className="technologies col-2 py-2 my-1 mx-2 rounded w-auto"><UilJavaScript size="30" color="#F0DB4F" /> Js</span>
            <span className="technologies col-2 py-2 my-1 mx-2 rounded w-auto"><UilBold size="30" color="#563D7C" /> Bootstrap</span>
          </p>

          <h6>API</h6>
          <ul className="px-5">
            <li><a className="about-us-link" href="https://rapidapi.com/wirefreethought/api/geodb-cities" target="/blank">GeoDB Cities</a></li>
            <li><a className="about-us-link" href="https://openweathermap.org/" target="/blank">OpenWeather</a></li>
          </ul>

          <h6>Source Code</h6>
          <ul className="px-5">
            <li><a className="about-us-link" href="https://github.com/thaianhtaivn/Weather-App" target="/blank"><UilGithub size="30" color="#053742" /></a></li>
          </ul>

        </div>

      </div>

    </div>
  )
}

export default About
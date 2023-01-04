import React, { Fragment } from 'react'
import { UilWind, UilRaindropsAlt, UilTachometerFast } from '@iconscout/react-unicons'

function Parameters({ speed, humidity, pressure}) {
  return (
    <Fragment>
        <div className="col-md-4 my-2 text-center">
            <div className="parameters">
              <p className="m-0">Wind Speed</p>
              <h2><UilWind size="30" color="white" /></h2>
              <h5 className="m-0">{speed} m/s</h5>
            </div>
          </div>
          <div className="col-md-4 my-2 text-center">
            <div className="parameters">
              <p className="m-0">Humidity</p>
              <h2><UilRaindropsAlt size="30" color="white" /></h2>
              <h5 className="m-0">{humidity}%</h5>
            </div>
          </div>
          <div className="col-md-4 my-2 text-center">
            <div className="parameters">
              <p className="m-0">Air Pressure</p>
              <h2><UilTachometerFast size="30" color="white" /></h2>
              <h5 className="m-0">{pressure} hPa</h5>
            </div>
          </div>
    </Fragment>
  )
}

export default Parameters
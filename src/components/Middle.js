import { React, useState, useEffect, Fragment} from "react";
import Parameters from "./Parameters";
import { UilMapMarker, UilTemperatureHalf, UilTemperatureEmpty,UilTemperature } from '@iconscout/react-unicons'
import SearchBar from "./SearchBar";
import {OpenWeatherApiUrl, OpenWeatherApiKey} from '../api/Api'
import Select from 'react-select'
import { DateTime } from "luxon";

function Middle({day}) {

  const [dict, setDict] = useState();
  const [dataOfDay, setDataOfDay] = useState();
  const [dashboard, setDashboard] = useState();
  const [time, setTime] = useState(null);

  const dateOnly = (dt, timezone, format = "cccc dd LLL yyyy") => DateTime.fromSeconds(dt).setZone("local").toFormat(format);
  const timeOnly = (dt, timezone, format = "hh:mm a") => DateTime.fromSeconds(dt).setZone("local").toFormat(format);
  
  const getDataDictionary=(location,currentWeather,forecast)=>{
    
    let dict = {  }
    const getKey = (timestamp) => {
      let date = new Date(timestamp*1000);
      date = date.toLocaleDateString().replace(/\//g,"")
      return date
    }

    setTime(timeOnly(currentWeather.dt, currentWeather.timezone)) // set time when dictionary created

    let key = getKey(currentWeather.dt) // date key
    let obj = {
      date: dateOnly(currentWeather.dt, currentWeather.timezone),
      time: timeOnly(currentWeather.dt, currentWeather.timezone),
      city: location,
      icon: currentWeather.weather[0].icon,
      temperature: currentWeather.main.temp,
      weather: currentWeather.weather[0].main,
      description: currentWeather.weather[0].description,
      min_temperature: currentWeather.main.temp_min,
      max_temperature: currentWeather.main.temp_max,
      windspeed: currentWeather.wind.speed,
      humidity: currentWeather.main.humidity,
      pressure: currentWeather.main.pressure,
    }
    let childDict = {} //hourley
    childDict[obj.time] = obj
    dict[key] = childDict;
    dict[key]["timeList"]= [obj.time]
    
    forecast.list.forEach((listItem) => {
      
      let key = getKey(listItem.dt) //date key
      let obj = {
        date: dateOnly(listItem.dt),
        time: timeOnly(listItem.dt),
        city: location,
        icon: listItem.weather[0].icon,
        temperature: listItem.main.temp,
        weather: listItem.weather[0].main,
        description: listItem.weather[0].description,
        min_temperature: listItem.main.temp_min,
        max_temperature: listItem.main.temp_max,
        windspeed: listItem.wind.speed,
        humidity: listItem.main.humidity,
        pressure: listItem.main.pressure,
      }
      
       if(dict[key]){ // exist
        dict[key][obj.time] = obj;
        dict[key]["timeList"].push(obj.time)
       }
       else { //new //hourley
        let childDict = {}
        childDict[obj.time] = obj
        dict[key] = childDict;
        dict[key]["timeList"] = [obj.time]
       }

    });
    return dict
  }

  const getDataByDate = (dict,date) => {
    const dataOfDay = dict[date]
    return dataOfDay
  }

  const getDataByTime = (dataOfDay,time) => {
    if (time === null)
    {
      time = dataOfDay.timeList[0]
    }
    const dashboard = dataOfDay[time]
    return dashboard
  }

  const handleSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const currentWeatherApiCall = fetch(
      `${OpenWeatherApiUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherApiKey}&units=metric`
    );
    const forecastWeatherApiCall = fetch(
      `${OpenWeatherApiUrl}/forecast?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherApiCall, forecastWeatherApiCall])
      .then(async (response) => {
        const currentWeatherApiCall_Response = await response[0].json();
        const forecastWeatherApiCall_Response = await response[1].json();
        
        const data = getDataDictionary(searchData.label,currentWeatherApiCall_Response,forecastWeatherApiCall_Response)
        setDict(data)
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{//set data of day when click on right navbar
    if(dict){
      const dataOfToday = getDataByDate(dict, day)
      setDataOfDay(dataOfToday)
      setTime(dataOfToday.timeList[0])
    }
  },[dict,day])

  useEffect(()=>{//set data of dashboard when click on right navbar
    if(dataOfDay){
      const dataOfDashboard = getDataByTime(dataOfDay,time)
      setDashboard(dataOfDashboard)
    }
  },[dataOfDay,time])

  const GetTimeDropdown = (currentValue) => { 

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        
      }),
      option: (provided, state) => ({
        ...provided,
        color: '#053742',
        backgroundColor: state.isFocused && "#A2DBFA",
     })
    }

    var timeList = [];
      dict[day].timeList.forEach(function(element) {
      timeList.push({ label:element, value: element })
    });

    const handleTimeChange = (inputValue) => {
      setTime(inputValue.value)
    };

    return(
      <Fragment>
        <Select 
        className="time-dropdown" 
        options={timeList} 
        styles={customStyles} 
        value={timeList.filter(function(option) {
          return option.value === time;
        })} 
        onChange={handleTimeChange} />
      </Fragment>
    ) 
  }

  
  return (
    <div className="col-md-7 col-sm-7 middle-col p-5">
      
      <div className="d-flex flex-column px-4">

        <SearchBar onSearchChange={handleSearchChange}></SearchBar>

        {
          dashboard &&
          <div className="row dashboard shadow-sm p-3">
          <div className="col-md-8 my-2">
            <div className="row my-2">
              <div className="col-md-6 col-sm-6 text-center py-2">
                <div className="m-0 logo"><UilMapMarker size="30" color="#053742"/>{dashboard.city}</div>
              </div>
              <div className="col-md-6 col-sm-6 text-center py-2">
                <div>
                  <p className="m-0">{dashboard.date}</p>
                  <GetTimeDropdown></GetTimeDropdown>
                </div>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-md-12 text-center my-auto">
                <h1 className="m-0"><UilTemperatureHalf size="30" color="#053742"/>{dashboard.temperature}°C</h1>
                <h4 className="m-0">{dashboard.weather}</h4>
                <p className="text-muted">{dashboard.description}</p>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-md-6 col-sm-6 text-center py-2">
                <p className="my-auto"><UilTemperatureEmpty size="20" color="#053742" />Min temp: {dashboard.min_temperature}°</p>
              </div>
              <div className="col-md-6 col-sm-6 text-center py-2">
                <p className="my-auto"><UilTemperature size="20" color="#053742" /> Max temp: {dashboard.max_temperature}°</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 my-2 d-flex align-items-center justify-content-center px-0">
            <div className="row">
              <div className="col-md-12">
                <div className="weather-image-div">
                  <img
                    className="weather-image img-fluid"
                    src={`../weather-icons/${dashboard.icon}.png`}
                    alt="Clouds"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        }

        {
          dashboard &&
          <div className="row dashboard bg-blue shadow-sm">

          <Parameters speed={dashboard.windspeed} humidity={dashboard.humidity} pressure = {dashboard.pressure}></Parameters>
          
          </div>
        }

        {
          dashboard == null &&
          <div className="row dashboard shadow-sm">
            <div className="col-md-12 text-center p-5">
              <img className="logo-home" src="../weather-icons/Logo.png" alt="Weather"></img>
              <p className="text-muted">Type your city name in Search box</p>
            </div>
          </div>
        }

      </div>

    </div>
  );
}

export default Middle;

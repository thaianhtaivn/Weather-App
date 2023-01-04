import React, { useState } from "react";
import { geoApiOptions, geoApiUrl } from "../api/Api";
import { AsyncPaginate } from "react-select-async-paginate";

function SearchBar({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState(null);
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
  const getCityList = (inputValue) => {
    return fetch(`${geoApiUrl}${inputValue}`, geoApiOptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  const handleInputChange = (inputValue) => {
    
    setSearchValue(inputValue);
    onSearchChange(inputValue);
  };
  return (
    <AsyncPaginate
      placeholder="Search City"
      debounceTimeout={600}
      value={searchValue}
      onChange={handleInputChange}
      loadOptions={getCityList}
      styles={customStyles}
    ></AsyncPaginate>
  );
}

export default SearchBar;

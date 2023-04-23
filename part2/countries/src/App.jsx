import { useState, useEffect } from "react";
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"



function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [findCountry, setFindCountry] = useState("");
  const [weather, setWeather] = useState([]);//empty first time, in second round shows info

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      if (findCountry !== "") {
        const result = response.data.filter(x =>
          x.name.common.toLowerCase().includes(findCountry.toLowerCase())
        );
        setAllCountries(result);
      }
    });
  }, [findCountry]);


  useEffect(() => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    const ACCESS_KEY = import.meta.env.VITE_SOME_KEY;

    const getting = async () =>{
      if (allCountries.length === 1) {
        const capital = allCountries.map(country => country.capital)
        if (capital[0]) {
          await axios
            .get(`${baseUrl}?q=${capital[0][0]}&appid=${ACCESS_KEY}&units=metric`)
            .then(response => {
              setWeather(response.data);
            });
        }
      }
    }
    getting()

  }, [allCountries]);


  const handleFind = (evt) => setFindCountry(evt.target.value);

  const handleClick = (countryName) =>  setFindCountry(countryName);


  return (
    <div>
      <Filter value={findCountry} onChange={handleFind}/>
      <Countries allCountries={allCountries} handleClick={handleClick} weather={weather} findCountry={findCountry}/>
    </div>

  )
}

export default App

import { useState, useEffect } from "react";
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"



function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [findCountry, setFindCountry] = useState("");

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


  const handleFind = (evt) => setFindCountry(evt.target.value);

  const handleClick = (countryName) =>  setFindCountry(countryName);


  return (
    <div>
      <Filter value={findCountry} onChange={handleFind}/>
      <Countries allCountries={allCountries} handleClick={handleClick}/>
    </div>

  )
}

export default App

import Country from "./Country"
import CountryDetails from "./CountryDetails"

const Countries = ({allCountries, handleClick}) => {

     if (allCountries.length > 10){
        return(<p>too many matches, specify another filter</p>)    
    }
    else if (allCountries.length <= 10 && allCountries.length > 1){
        return (
            allCountries.map(x=> 
            <Country key={x.name.common} country={x} handleClick={handleClick}/>)
          )    
    }  else if (allCountries.length === 1) {
      return (
          allCountries.map(x => 
            <CountryDetails key={x.name.common} country={x} />
          )
      );
    } else {
      return <></>;
    }
    

    }
export default Countries;
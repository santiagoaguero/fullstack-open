
const CountryDetails = ({country}) => {


  return(<>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    <p>Poulation: {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(lan =>
      <li key={lan}>{lan}</li>)}
    </ul>
    <img src={country.flags.png} height="150" alt={`${country.name.common} flag`} />

    </>)


}

export default CountryDetails;
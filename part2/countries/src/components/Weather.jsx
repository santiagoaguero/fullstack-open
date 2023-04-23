const Weather =  ({weather}) => {
    if (weather.length != 0){//first time state is empty. just in the second call it brings info
        return(
    <>

            <>
            <h3>Weather in {weather.name}</h3>
            <p><b>temperature</b> {weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>{/*this api doesn't have img/icons */}
            <p><b>wind speed</b> {weather.wind.speed} m/s</p>{/*meter/second*/}
            </>

        {console.log("temp",weather)}
        {console.log("icon",weather.weather)}
    
    </>
    )}
}

export default Weather;
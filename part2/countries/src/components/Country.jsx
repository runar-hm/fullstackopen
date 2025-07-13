import { useLayoutEffect } from "react"

const flagStyle = {
    fontSize : '130px',
    margin : 10
}

const Country = ({ country, weather }) => {

    const iconBaseUrl = 'https://openweathermap.org/img/wn/'
    console.log(weather);
    
    return(
    <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>

    <h2>Languages</h2>
    <ul>
        {
            Object.values(country.languages).map(language => <li key={language}> {language} </li>)
        }
    </ul>

    <p style={flagStyle}>{country.flag}</p>

    <h2>Weather in {country.name.common}</h2>
    <p>Temperature {weather.main.temp} ℃</p>
    <img src={`${iconBaseUrl}${weather.weather[0].icon}.png`}></img>
    <p>Wind {weather.wind.speed} m/s</p>
    </div>
    )
}

const CountryListItem = ({ country, onClick }) => {
    return ( 
    <div>
        <p>{country.name.common}</p><button onClick={onClick}>show</button>
    </div>
    )
}

export { Country, CountryListItem }
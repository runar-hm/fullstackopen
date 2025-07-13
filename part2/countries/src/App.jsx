import { useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import { Country, CountryListItem } from './components/Country'
import countriesServices from './services/countries'
import weatherServies from './services/weather'
import { useEffect } from 'react'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ searchText, setSearchText ] = useState('')
  const [ weather, setWeather ] = useState()

  useEffect( () => {
    countriesServices
      .getAll()
      .then(initialCountries => setCountries(initialCountries))
    }, [])

    const handleSearch = (event) => {
      setSearchText(event.target.value)
    }

    useEffect( () => { 
      const filtered = countries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))
      if (filtered.length === 1){
        weatherServies
        .fetchCurrentWeather(filtered[0].capital[0], filtered[0].cca2)
        .then(weather => {
          console.log('got weather: ')
          setWeather(weather)
        }
      )

      }
      setFilteredCountries( filtered )
    }, [searchText])
    
    const showCountry = (name) => {
      setSearchText(name)

    }

    return (
      <div>
        <h2>Countries</h2>
        <Filter searchText='search ' onChange={handleSearch}/>
        
        {
          (filteredCountries.length === 1)
          ? (weather
            ? <Country country={filteredCountries[0]} weather={weather}/>
            : <p>Waiting for response from weather API</p> )
          : (filteredCountries.length < 10)
          ? filteredCountries.map(country => <CountryListItem key={country.cca2} country={country} onClick={() => showCountry(country.name.common)} />)
          : <p>Too many matches, specify filter</p>
        }
        
      </div>
    )

}

export default App
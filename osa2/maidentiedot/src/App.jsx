import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const ShowNames = ({ namesToShow }) => {
  if (namesToShow.length > 10 ) {
    return (
      <div>Too many countries, specify using filter</div>
    )
  } else if (namesToShow.length === 1) {
    return <ShowInfo country={namesToShow[0]}/>
  } 
  else if (namesToShow.length > 0) {
  return (
    <ul>
      {namesToShow.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <Button country={country}/>
        </li>
      ))}
    </ul>
  )}
}

const Button = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false)
  const handleClick = () => {
    setShowInfo(!showInfo)
  }
  return (
    <>
      <button onClick={handleClick}>
        {showInfo 
        ? 'close' 
        : 'show'}
      </button>
      {showInfo && <ShowInfo country={country} />}
    </>
  )
}

const ShowInfo = ({ country }) => { 

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>

      <b>Languages:</b>
      <ul>
        {Object.values(country.languages).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{width:'200px', height:'200px'}}/>
      <WeatherApi country={country} />
    </div>
  )
}

const WeatherApi = ({ country }) => {

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
      .then((response) => {
        setWeather(response.data)
        console.log(response.data)
        
      })
  }, [])
  
  return (
    <div>
      <h4>Weather in {country.capital}</h4>
      <div>
        Temperature: {((weather.main && weather.main.temp)-273.15).toFixed(2)} Celcius
      </div>
      <div>
        <img src={weather.weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt='weather image' style={{width:'100px', height:'100px'}}/>
      </div>
      <div>
        wind {weather.wind && weather.wind.speed} m/s
      </div>
      <div></div>
    </div>
  )
}

const RenderFilter = ({filters, handleFilterChange}) => {
  return (
    <form>
        <div>
          Find countries<input
          value={filters}
          onChange={handleFilterChange}
          />
        </div>
      </form>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filters, setFilters] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log("error", error)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilters(event.target.value)
  }

  const namesToShow = filters
  ? countries.filter(country => 
    country.name.common.toLowerCase().includes(filters.toLowerCase()))
  : countries

  return (
    <div>
      <RenderFilter filters={filters} handleFilterChange={handleFilterChange}/>
      <ShowNames namesToShow={namesToShow}/>
    </div>
  )
}

export default App

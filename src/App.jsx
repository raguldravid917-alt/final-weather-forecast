import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import { fetchCurrentWeather, fetchForecast } from './utils/api'

export default function App() {
  const [city, setCity] = useState('')
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadWeatherByCoords(lat, lon) {
    try {
      setLoading(true)
      setError('')
      const cur = await fetchCurrentWeather({ lat, lon })
      const f = await fetchForecast({ lat, lon })
      setCurrent(cur)
      setForecast(f)
      setCity(cur.name)
    } catch (err) {
      console.error('loadWeatherByCoords error:', err)
      setError(err.message || 'Unable to load weather')
    } finally {
      setLoading(false)
    }
  }

  async function loadWeatherByCity(q) {
    try {
      setLoading(true)
      setError('')
      const cur = await fetchCurrentWeather({ q })
      const f = await fetchForecast({ q })
      setCurrent(cur)
      setForecast(f)
      setCity(cur.name)
    } catch (err) {
      console.error('loadWeatherByCity error:', err)
      setError(err.message || 'City not found')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // auto-location on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
        },
        (err) => {
          // if user denies or geolocation fails, fallback to a default city
          console.warn('Geolocation failed, falling back to Chennai')
          loadWeatherByCity('Chennai')
        }
      )
    } else {
      loadWeatherByCity('Chennai')
    }
  }, [])

  return (
    <div className="app-root">
      <header className="topbar">
        <h1>Weather Dashboard</h1>
        <Search
          onSearch={(q) => loadWeatherByCity(q)}
          onUseMyLocation={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
              })
            }
          }}
        />
      </header>

      <main className="container">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {current && <CurrentWeather data={current} />}
        {forecast.length > 0 && <Forecast days={forecast} />}
      </main>

      <footer className="footer">
        <small>Built with React + Vite • Light green theme</small>
      </footer>
    </div>
  )
}

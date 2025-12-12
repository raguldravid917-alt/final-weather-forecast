import React from 'react'

function kToC(k) {
  return Math.round(k - 273.15)
}

export default function CurrentWeather({ data }) {
  const { weather, main, wind, name } = data
  const icon = weather[0].icon
  return (
    <section className="card current">
      <div className="card-left">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={weather[0].description}
        />
        <div className="temp">{kToC(main.temp)}°C</div>
      </div>
      <div className="card-right">
        <h2>{name}</h2>
        <p className="desc">{weather[0].description}</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    </section>
  )
}

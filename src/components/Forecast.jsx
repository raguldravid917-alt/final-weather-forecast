import React from 'react'

function kToC(k) {
  return Math.round(k - 273.15)
}

export default function Forecast({ days }) {
  return (
    <section className="forecast">
      {days.map((d) => (
        <div key={d.date} className="forecast-day card">
          <div className="date">{d.date}</div>
          <img src={d.iconUrl} alt={d.desc} />
          <div className="temps">
            <div>{kToC(d.temp_min)}°</div>
            <div>{kToC(d.temp_max)}°</div>
          </div>
          <div className="desc">{d.desc}</div>
        </div>
      ))}
    </section>
  )
}

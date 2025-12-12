// src/utils/api.js
const BASE = 'https://api.openweathermap.org/data/2.5';
const KEY = import.meta.env.VITE_OWM_KEY;

async function fetchJSON(url) {
  const res = await fetch(url);
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch (e) {
    // non-json response
  }

  if (!res.ok) {
    // Prefer server-provided message, fallback to status text
    const msg = (body && body.message) ? body.message : res.statusText || 'API error';
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return body;
}

export async function fetchCurrentWeather({ q, lat, lon }) {
  if (!KEY) throw new Error('Missing OpenWeatherMap API key. Set VITE_OWM_KEY in .env');
  let url = `${BASE}/weather?appid=${KEY}&units=metric`;
  if (q) url += `&q=${encodeURIComponent(q)}`;
  else url += `&lat=${lat}&lon=${lon}`;
  return fetchJSON(url);
}

export async function fetchForecast({ q, lat, lon }) {
  if (!KEY) throw new Error('Missing OpenWeatherMap API key. Set VITE_OWM_KEY in .env');
  let url = `${BASE}/forecast?appid=${KEY}&units=metric`;
  if (q) url += `&q=${encodeURIComponent(q)}`;
  else url += `&lat=${lat}&lon=${lon}`;

  const data = await fetchJSON(url); // may throw with proper message
  if (!data || !data.list) throw new Error('Forecast data unavailable');

  const byDate = {};
  data.list.forEach((item) => {
    const day = item.dt_txt.split(' ')[0];
    if (!byDate[day]) byDate[day] = [];
    byDate[day].push(item);
  });

  const days = Object.keys(byDate)
    .slice(0, 5)
    .map((day) => {
      const items = byDate[day];
      const temps = items.map((i) => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      const midday = items[Math.floor(items.length / 2)];
      return {
        date: new Date(day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
        temp_min: min,
        temp_max: max,
        iconUrl: `https://openweathermap.org/img/wn/${midday.weather[0].icon}@2x.png`,
        desc: midday.weather[0].description
      };
    });

  return days;
}

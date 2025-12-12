import React, { useState } from 'react'

export default function Search({ onSearch, onUseMyLocation }) {
  const [q, setQ] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!q.trim()) return
    onSearch(q.trim())
    setQ('')
  }

  return (
    <div className="search-box">
      <form onSubmit={submit} className="search-form">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter city name"
          aria-label="City"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={onUseMyLocation} className="loc-btn">
          Use my location
        </button>
      </form>
    </div>
  )
}

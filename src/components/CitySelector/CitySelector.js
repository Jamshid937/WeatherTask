import React from 'react';

export const CitySelector = ({ city, changeCity }) => (
  <div>
    <label htmlFor="city-select">Shahar:</label>
    <select id="city-select" className='city-select' value={city} onChange={e => changeCity(e.target.value)}>
      {['London', 'New York', 'Tokyo', 'Sydney', 'Cairo'].map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
);
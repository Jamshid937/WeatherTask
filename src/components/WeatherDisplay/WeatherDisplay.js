import React from 'react';

export const WeatherDisplay = ({ data, unit }) => {
  const weatherItem = data?.weather?.[0];

  
  if (!data || !weatherItem) return <p>Yuklanmoqda...</p>;

  const temp = Math.round(data.temp);

  const iconCode = weatherItem.icon;
  const desc = weatherItem.description;

  return (
    <div className="weather-display">
       <img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={desc}
        width="60"
      />

      <h2>
        {temp}{unit === 'metric' ? '°C' : '°F'}
      </h2>
      <p>{desc}</p>
    </div>
  );
};

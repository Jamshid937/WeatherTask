import React from 'react';

const ForecastList = ({ forecast, unit }) => {
  if (!forecast) return <p>Prognoz yuklanmoqda...</p>;

  const daily = forecast.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="forecast-list">
      {daily.map(item => {
        const icon = item.weather?.[0]?.icon;
        const desc = item.weather?.[0]?.description;
        const tempValue = Math.round(item.main.temp);
        
        return (
          <div key={item.dt} className="forecast-card">
            <div>{new Date(item.dt * 1000).toLocaleDateString('uz-UZ', {
              weekday: 'short'
            })}</div>

            {icon && (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={desc}
                width="50"
              />
            )}

            <div>
              {tempValue}{unit === 'metric' ? '°C' : '°F'}
            </div>
            <div>{desc}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastList;

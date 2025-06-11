import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useWeatherData } from '../../hooks/useWeatherData';
import { CitySelector } from '../CitySelector/CitySelector';
import { WeatherDisplay } from '../WeatherDisplay/WeatherDisplay';
import ForecastList from '../ForecastList/ForecastList';
import { DataVisualization } from '../DataVisualization/DataVisualization';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';

export const WeatherWidget = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
const { city, data, forecast, unit, changeCity, toggleUnit, error } = useWeatherData();
  return (
    <div className='WeatherWidget'>
    <div className={`widget ${theme}`} style={{ maxWidth: 800, margin: 'auto', padding: 20,  background: theme === 'light' ? '#f8f9fa' : '#212529', color: theme === 'light' ? '#212529' : '#f8f9fa', borderRadius: 8 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={toggleTheme} style={{ padding: '8px 12px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
          Tema: {theme === 'light' ? '☀️' : '🌙'}
        </button>
      </header>
      <CitySelector city={city} changeCity={changeCity} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <WeatherDisplay data={data} unit={unit} />
      <ForecastList forecast={forecast} unit={unit} />
      <DataVisualization forecast={forecast} unit={unit}  />
      <SettingsPanel unit={unit} toggleUnit={toggleUnit} />
    </div>
    </div>
  );
};
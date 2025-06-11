import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherWidget } from './components/WeatherWidget/WeatherWidget';

export default function App() {
  return (
    <ThemeProvider>
        <WeatherWidget />
    </ThemeProvider>
  );
}

import React from 'react';

export const SettingsPanel = ({ unit, toggleUnit }) => (
  <div className="settings-panel">
    <button onClick={toggleUnit}>
      Birlik: {unit === 'metric' ? '°C' : '°F'}
    </button>
  </div>
);
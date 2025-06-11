import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip
} from 'recharts';

export const DataVisualization = ({ forecast, unit }) => {
  if (!forecast) return null;
  const daily = forecast.filter((_, i) => i % 8 === 0).slice(0,5);
  const data = daily.map(item => ({
    day: new Date(item.dt * 1000).toLocaleDateString('uz-UZ', { weekday: 'short' }),
    temp: item.main.temp
  }));

  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis unit={unit === 'metric' ? '°C' : '°F'} />
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#007BFF" dot />
      </LineChart>
    </ResponsiveContainer>
  );
};

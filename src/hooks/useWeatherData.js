import { useReducer, useEffect } from 'react';
import { throttle } from '../utils/throtle';

const ACTIONS = {
    FETCH: 'FETCH_WEATHER',
    FETCH_FORECAST: 'FETCH_FORECAST',
    CHANGE_CITY: 'CHANGE_CITY',
    TOGGLE_UNIT: 'TOGGLE_UNIT',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

const initialState = {
    city: 'London',
    unit: 'metric',
    data: null,
    forecast: null,
    error: null,
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.FETCH:
            return { ...state, data: payload, error: null };
        case ACTIONS.FETCH_FORECAST:
            return { ...state, forecast: payload, error: null };
        case ACTIONS.CHANGE_CITY:
            return { ...state, city: payload };
        case ACTIONS.TOGGLE_UNIT:
            return { ...state, unit: state.unit === 'metric' ? 'imperial' : 'metric' };
        case ACTIONS.SET_ERROR:
            return { ...state, error: payload };
        case ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};

export const useWeatherData = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { city, unit } = state;
    const KEY = process.env.REACT_APP_OWM_API_KEY;
    const BASE = process.env.REACT_APP_OWM_BASE_URL;

    //  weather fetch
    const fetchData = async cityName => {
        const url = `${BASE}/weather?q=${cityName}&units=${unit}&lang=uz&appid=${KEY}`;
        console.log('FETCH URL:', url);
        try {
            const res = await fetch(url);
            console.log(res.status, res.headers.get('content-type'));
            if (!res.ok) {
                const text = await res.text();
                console.error('Error HTML:', text);
                throw new Error(`Status ${res.status}`);
            }
            const ct = res.headers.get('content-type') || '';
            if (!ct.includes('application/json')) {
                const text = await res.text();
                console.error('Not JSON:', text);
                throw new Error('Invalid response type');
            }
            const json = await res.json();
            dispatch({ type: ACTIONS.FETCH, payload: { temp: json.main.temp, desc: json.weather[0].description, weather: json.weather  } });
        } catch (e) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: e.message });
        }
    };

    // 5‑kunlik forecast fetch
    const fetchForecast = async cityName => {
        const url = `${BASE}/forecast?q=${cityName}&units=${unit}&lang=uz&appid=${KEY}`;
        console.log('FORECAST URL:', url);
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Forecast olishda xato');
            const json = await res.json();
            // Forecast...
            dispatch({
                type: ACTIONS.FETCH_FORECAST,
                payload: json.list
            });
        } catch (e) {
            console.error(e);
        }
    };

    const throttledFetch = throttle(fetchData, 60000);

    //  useEffect ichida ikkita fetch chaqiruvi
    useEffect(() => {
        throttledFetch(city);
        fetchForecast(city);
    }, [city, unit]);

    return {
        city,
        unit,
        data: state.data,
        forecast: state.forecast,
        error: state.error,
        changeCity: newCity => dispatch({ type: ACTIONS.CHANGE_CITY, payload: newCity }),
        toggleUnit: () => dispatch({ type: ACTIONS.TOGGLE_UNIT }),
    };
};




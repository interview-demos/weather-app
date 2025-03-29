import { WeatherResponse } from '../types/weather';
import axios from 'axios';

const KEY = '6098dd8683b4d7dfca8d6ca09f946c21'

const params = {
    key: KEY,
    city: '上海'
}

// 模拟天气数据
const querySimpleWeather = async (location: string): Promise<WeatherResponse> => {
    if (location) {
        params.city = location
    }
    const forecast = await axios.get('/simpleWeather/query', {
        params
    },);
    return forecast.data?.result;
};

export const getWeatherForecast = async (location: string = '上海'): Promise<WeatherResponse> => {

    return querySimpleWeather(location);
};
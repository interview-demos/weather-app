export interface WeatherData {
  date: string;
  temperature: string;
  weather: string;
  wid: Object;
  direct: string
}

export interface WeatherResponse {
  city: string;
  realtime: Object;
  future: WeatherData[];
}
export interface ICurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: 1 | 0;
  time: string;
}

export interface IHourlyData {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
  cloudcover: number[];
  visibility: number[];
  windspeed_10m: number[];
  winddirection_10m: number[];
  is_day: (0 | 1)[];
  uv_index: number[];
}

export interface ILocationData {
  city: string;
  country: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export interface IWeatherData {
  current_weather: {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: 0 | 1;
    weathercode: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    weathercode: number[];
    cloudcover: number[];
    visibility: number[];
    windspeed_10m: number[];
    winddirection_10m: number[];
    is_day: (0 | 1)[];
    uv_index: number[];
  };
  daily: {
    time: [string, string, string, string, string, string, string];
    sunrise: [string, string, string, string, string, string, string];
    sunset: [string, string, string, string, string, string, string];
  };
}

export type RandomWeirdObjType = {
  id: number;
  paragraphs: string[];
  paragraph: string;
  source?: {
    url: string;
    name: string;
  };
} | null;

type GeolocationDataVercelHeaders =
  | 'x-vercel-ip-city'
  | 'x-vercel-ip-country'
  | 'x-vercel-ip-latitude'
  | 'x-vercel-ip-longitude';

export interface IHeadersList {
  get: (vercelHeader: GeolocationDataVercelHeaders) => string | undefined;
}

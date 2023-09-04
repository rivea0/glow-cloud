import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import { weatherCodes } from '@lib/utils'
import CurrentWeather from '@components/current-weather'

const weatherDataExample = {
  temperature: 30,
  windspeed: 10,
  winddirection: 23,
  weathercode: 1, // mainly clear
  is_day: 1 as 1 | 0,
  time: '2023-09-04T20:00'
}

const city = 'Paris'
const country = 'France'


describe('CurrentWeather', () => {
  it('renders', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
  })

  it('shows image', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
    
    expect(screen.getByRole('img', {name: 'mainly clear'})).toBeInTheDocument() 
  })

  it('shows temperature', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
    
    expect(screen.getByTestId('temperature')).toHaveTextContent('30°C')
  })

  it('shows date', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
    const dateStr = new Date(weatherDataExample.time).toLocaleString('en-us', {month: 'long', day: 'numeric', weekday: 'long'})
    
    expect(screen.getByText(dateStr)).toBeInTheDocument()
  })

  it('shows description', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
    const description = `${weatherCodes[weatherDataExample.weathercode]
      .description[0]
      .toUpperCase()}${weatherCodes[weatherDataExample.weathercode].description.slice(1)}`;    
    
    expect(screen.getByTestId('description')).toHaveTextContent(`${description} in ${city}, ${country}`)
  })

  it('shows wind direction', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
    
    expect(screen.getByText(`${weatherDataExample.winddirection}° from the north`)).toBeInTheDocument()
  })

  it('shows wind speed', () => {
    render(<CurrentWeather weatherData={weatherDataExample} city={city} countryName={country} />)
    
    expect(screen.getByText(`${weatherDataExample.windspeed} mph`)).toBeInTheDocument()
  })
})
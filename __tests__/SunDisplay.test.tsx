import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import SunDisplay from '@components/sun-display'

const dateExample = new Date('2023-09-04T22:00').toLocaleString('en-us', {month: 'long', day: 'numeric', weekday: 'long'})
const sunriseExample = new Date('2023-09-04T06:34').toLocaleString('en-us', {hour: 'numeric', minute: 'numeric'})
const sunsetExample = new Date('2023-09-04T19:34').toLocaleString('en-us', {hour: 'numeric', minute: 'numeric'})

describe('SunDisplay', () => {
  it('renders', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)
  })

  it('shows title', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)
    
    expect(screen.getByRole('heading', { name: 'What About the Sun?' })).toBeInTheDocument()
  })

  it('shows date', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)

    expect(screen.getByRole('heading', { name: dateExample })).toBeInTheDocument()
  })

  it('shows sunrise icon', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)

    expect(screen.getByRole('img', { name: 'sunrise icon' })).toBeInTheDocument()
  })

  it('shows sunrise text', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)

    expect(screen.getByTestId('sunrise')).toHaveTextContent(`The Sun rises at ${sunriseExample}, oblivious to its significance on our tiny planet.`)
  })

  it('shows sunset icon', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)

    expect(screen.getByRole('img', { name: 'sunset icon' })).toBeInTheDocument()
  })

  it('shows sunrise text', () => {
    render(<SunDisplay date={dateExample} sunrise={sunriseExample} sunset={sunsetExample} />)

    expect(screen.getByTestId('sunset')).toHaveTextContent(`It sets at ${sunsetExample}, seems frightened.`)
  })
})

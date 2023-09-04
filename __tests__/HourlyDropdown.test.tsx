import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HourlyDropdown from '@components/hourly-dropdown'

const noop = () => { }

const days = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']

describe('HourlyDropdown', () => {
  it('renders', () => {
    render(<HourlyDropdown days={days} onChange={noop} />)
  })

  it('shows the dropdown', () => {
    render(<HourlyDropdown days={days} onChange={noop} />)

    expect(screen.getByLabelText('Select day:')).toBeInTheDocument()
  })
})
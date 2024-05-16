import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DaysDropdown } from '@components/hourly-dropdown'

const noop = () => { }

const days = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']

describe('DaysDropdown', () => {
  it('renders', () => {
    render(<DaysDropdown days={days} onChange={noop} />)
  })

  it('shows the dropdown', () => {
    render(<DaysDropdown days={days} onChange={noop} />)

    expect(screen.getByLabelText('Select day:')).toBeInTheDocument()
  })
})
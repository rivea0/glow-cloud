import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import { getHourlyExampleData } from '@lib/utils'
import Hourly from '@components/hourly'

const hourlyDataExample = getHourlyExampleData()

describe('Hourly', () => {
  it('renders', () => {
    render(<Hourly hourlyData={hourlyDataExample} currentHour={0} />)
  })

  it('shows title', () => {
    render(<Hourly hourlyData={hourlyDataExample} currentHour={0} />)

    expect(screen.getByRole('heading', { name: 'Hour by Hour' })).toBeInTheDocument()
  })

  it('shows hourly box', () => {
    render(<Hourly hourlyData={hourlyDataExample} currentHour={0} />)

    const hourlyItems = screen.getAllByTestId('hourlyItem')
    hourlyItems.forEach(item => expect(item).toBeInTheDocument())
  })
})

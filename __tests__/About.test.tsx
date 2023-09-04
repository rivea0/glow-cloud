import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from '@about/page'

describe('About', () => {
  it('renders', () => {
    render(<About />)
  })

  it('shows the main sentence', () => {
    render(<About />)
    const p = screen.getByText('Glow Cloud is a daily (and hourly) weather report*, with slightly an absurd take.')

    expect(p).toBeInTheDocument()
  })

  it('shows the link to Welcome to Night Vale', () => {
    render(<About />)
    const link = screen.getByRole('link', {name: 'Welcome to Night Vale'})

    expect(link).toBeInTheDocument()
  })

  it('shows the go back link', () => {
    render(<About />)
    const link = screen.getByRole('link', {name: 'Go back'})

    expect(link).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@components/footer'


describe('Footer', () => {
  it('renders', () => {
    render(<Footer />)
  })
  
  it('shows the icons', () => {
    render(<Footer />)

    expect(screen.getByTestId('icons')).toBeInTheDocument()
  })

  it('shows the copyright text', () => {
    render(<Footer />)

    expect(screen.getByTestId('footer-end')).toBeInTheDocument()
  })
})
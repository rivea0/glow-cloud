import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Logo from '@components/logo'

describe('Logo', () => {
  it('renders', () => {
    render(<Logo />)
  })

  it ('shows logo title', () => {
    render(<Logo />)
    
    expect(screen.getByRole('heading', {name: 'glow cloud*'})).toBeInTheDocument()
  })

  it ('shows logo subtitle', () => {
    render(<Logo />)
    
    expect(screen.getByRole('heading', {name: '*all hail'})).toBeInTheDocument()
  })
})

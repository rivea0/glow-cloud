import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@components/header'

describe('Header', () => {
  it('renders', () => {
    render(<Header />)
  })

  it ('displays logo text', () => {
    render(<Header />)

    vi.mock('next/font/google', () => ({
      DM_Sans: () => ({
        style: {
          fontFamily: 'mocked',
        },
      }),
    }))

    expect(screen.getByText('glow cloud*')).toBeInTheDocument()
    expect(screen.getByText('*all hail')).toBeInTheDocument()
  })
})

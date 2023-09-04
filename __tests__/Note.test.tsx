import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import Note from '@components/note'


describe('Note', () => {
  it('renders', () => {
    render(<Note weathercode={1}/>)
  })

  it('shows the note', () => {
    render(<Note weathercode={1} />)

    expect(screen.getByTestId('note')).toBeInTheDocument()
  })
})
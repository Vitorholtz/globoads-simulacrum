import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label="Publicado" />)
    expect(screen.getByText('Publicado')).toBeInTheDocument()
  })

  it('defaults to neutral variant', () => {
    const { container } = render(<Badge label="Test" />)
    expect(container.firstChild).toHaveClass('neutral')
  })

  it('applies the given variant class', () => {
    const { container } = render(<Badge label="Erro" variant="critical" />)
    expect(container.firstChild).toHaveClass('critical')
  })

  it('applies an extra className when provided', () => {
    const { container } = render(<Badge label="X" className="myClass" />)
    expect(container.firstChild).toHaveClass('myClass')
  })

  it('renders as a <span>', () => {
    const { container } = render(<Badge label="Tag" />)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })
})

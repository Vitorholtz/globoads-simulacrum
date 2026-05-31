import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DimensionRow from './DimensionRow'

const TOKEN = { name: 'MD', variable: '--spacing-300', valuePx: 24, valueRem: '1.5rem' }

describe('DimensionRow', () => {
  it('renders the token name, formatted value and variable', () => {
    render(
      <DimensionRow token={TOKEN} rowHeight={80} displayHeight={40}>
        <div data-testid="demo" />
      </DimensionRow>
    )
    expect(screen.getByText('MD')).toBeInTheDocument()
    expect(screen.getByText('1.5rem / 24px')).toBeInTheDocument()
    expect(screen.getByText('--spacing-300')).toBeInTheDocument()
  })

  it('formats a zero value as "0"', () => {
    const zero = { name: 'None', variable: '--spacing-0', valuePx: 0, valueRem: '0rem' }
    render(
      <DimensionRow token={zero} rowHeight={80} displayHeight={40}>
        <span />
      </DimensionRow>
    )
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders the demo children', () => {
    render(
      <DimensionRow token={TOKEN} rowHeight={80} displayHeight={40}>
        <div data-testid="demo" />
      </DimensionRow>
    )
    expect(screen.getByTestId('demo')).toBeInTheDocument()
  })

  it('exposes height knobs as CSS custom properties', () => {
    const { container } = render(
      <DimensionRow token={TOKEN} rowHeight={108} displayHeight={76}>
        <span />
      </DimensionRow>
    )
    const row = container.firstChild as HTMLElement
    expect(row.style.getPropertyValue('--dim-row-h')).toBe('108px')
    expect(row.style.getPropertyValue('--dim-display-h')).toBe('76px')
  })
})

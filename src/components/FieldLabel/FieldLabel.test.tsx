import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FieldLabel from './FieldLabel'

describe('FieldLabel', () => {
  it('renders the label linked to the field via htmlFor', () => {
    render(<FieldLabel label="Nome" htmlFor="field-1" />)
    const label = screen.getByText('Nome')
    expect(label).toHaveAttribute('for', 'field-1')
  })

  it('renders nothing when showLabel is false', () => {
    const { container } = render(<FieldLabel label="Nome" htmlFor="x" showLabel={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows the "Opcional" tag when optional', () => {
    render(<FieldLabel label="Nome" htmlFor="x" optional />)
    expect(screen.getByText('Opcional')).toBeInTheDocument()
  })

  it('renders the description tooltip only when descriptionText is set', () => {
    const { rerender } = render(<FieldLabel label="Nome" htmlFor="x" />)
    expect(screen.queryByRole('button', { name: 'Mais informações' })).not.toBeInTheDocument()

    rerender(<FieldLabel label="Nome" htmlFor="x" descriptionText="Ajuda contextual" />)
    expect(screen.getByRole('button', { name: 'Mais informações' })).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Ajuda contextual')
  })
})

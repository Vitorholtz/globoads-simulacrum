import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FieldMessage from './FieldMessage'

describe('FieldMessage', () => {
  it('renders help text when there is no error', () => {
    render(<FieldMessage helpText="Dica útil" />)
    expect(screen.getByText('Dica útil')).toBeInTheDocument()
  })

  it('renders the error message and hides help text when in error', () => {
    render(<FieldMessage helpText="Dica útil" errorMessage="Campo obrigatório" hasError />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
    expect(screen.queryByText('Dica útil')).not.toBeInTheDocument()
  })

  it('renders nothing when neither help nor error applies', () => {
    const { container } = render(<FieldMessage />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing in error state without an error message', () => {
    const { container } = render(<FieldMessage hasError />)
    expect(container).toBeEmptyDOMElement()
  })
})

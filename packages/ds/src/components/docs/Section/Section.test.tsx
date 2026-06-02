import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from './Section'

describe('Section', () => {
  it('renders the title and children', () => {
    render(
      <Section icon="label" title="Variantes">
        <p>conteúdo</p>
      </Section>
    )
    expect(screen.getByRole('heading', { name: 'Variantes' })).toBeInTheDocument()
    expect(screen.getByText('conteúdo')).toBeInTheDocument()
  })

  it('renders the icon glyph', () => {
    render(
      <Section icon="checklist" title="Diretrizes">
        <span />
      </Section>
    )
    expect(screen.getByText('checklist')).toBeInTheDocument()
  })

  it('renders the count badge when provided', () => {
    render(
      <Section icon="label" title="Variantes" count="5 variantes">
        <span />
      </Section>
    )
    expect(screen.getByText('5 variantes')).toBeInTheDocument()
  })

  it('renders as a <section>', () => {
    const { container } = render(
      <Section icon="label" title="X">
        <span />
      </Section>
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('applies an extra className when provided', () => {
    const { container } = render(
      <Section icon="label" title="X" className="myClass">
        <span />
      </Section>
    )
    expect(container.firstChild).toHaveClass('myClass')
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GuidelinesGrid from './GuidelinesGrid'
import type { GuidelineDef } from '../../tokens/types'

const ITEMS: GuidelineDef[] = [
  { title: 'Use cores semânticas', body: 'Cada variante mapeia um estado.', rule: 'Faça isso' },
  { title: 'Evite excesso', body: 'Não empilhe badges.', rule: 'Não faça aquilo' },
]

describe('GuidelinesGrid', () => {
  it('renders one card per item', () => {
    const { container } = render(<GuidelinesGrid items={ITEMS} />)
    const grid = container.firstChild as HTMLElement
    expect(grid.children).toHaveLength(2)
  })

  it('renders title, body and rule for each item', () => {
    render(<GuidelinesGrid items={ITEMS} />)
    expect(screen.getByRole('heading', { name: 'Use cores semânticas' })).toBeInTheDocument()
    expect(screen.getByText('Cada variante mapeia um estado.')).toBeInTheDocument()
    expect(screen.getByText('Faça isso')).toBeInTheDocument()
  })

  it('renders nothing in the grid when items is empty', () => {
    const { container } = render(<GuidelinesGrid items={[]} />)
    const grid = container.firstChild as HTMLElement
    expect(grid.children).toHaveLength(0)
  })

  it('applies an extra className when provided', () => {
    const { container } = render(<GuidelinesGrid items={ITEMS} className="myClass" />)
    expect(container.firstChild).toHaveClass('myClass')
  })
})

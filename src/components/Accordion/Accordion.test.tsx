import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Accordion from './Accordion'

const ITEMS = [
  { id: 'a', label: 'Seção A', content: <p>Conteúdo A</p> },
  { id: 'b', label: 'Seção B', content: <p>Conteúdo B</p> },
]

describe('Accordion', () => {
  it('renders a header button per item', () => {
    render(<Accordion items={ITEMS} />)
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('all items start collapsed', () => {
    render(<Accordion items={ITEMS} />)
    screen
      .getAllByRole('button')
      .forEach((btn) => expect(btn).toHaveAttribute('aria-expanded', 'false'))
  })

  it('opens the item matching defaultOpenId on mount', () => {
    render(<Accordion items={ITEMS} defaultOpenId="b" />)
    const [btnA, btnB] = screen.getAllByRole('button')
    expect(btnA).toHaveAttribute('aria-expanded', 'false')
    expect(btnB).toHaveAttribute('aria-expanded', 'true')
  })

  it('expands an item on click', async () => {
    render(<Accordion items={ITEMS} />)
    await userEvent.click(screen.getByRole('button', { name: 'Seção A' }))
    expect(screen.getByRole('button', { name: 'Seção A' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an already-open item on click', async () => {
    render(<Accordion items={ITEMS} defaultOpenId="a" />)
    await userEvent.click(screen.getByRole('button', { name: 'Seção A' }))
    expect(screen.getByRole('button', { name: 'Seção A' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('closes the previously-open item when another item opens', async () => {
    render(<Accordion items={ITEMS} defaultOpenId="a" />)
    await userEvent.click(screen.getByRole('button', { name: 'Seção B' }))
    const [btnA, btnB] = screen.getAllByRole('button')
    expect(btnA).toHaveAttribute('aria-expanded', 'false')
    expect(btnB).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders badge and icon when provided', () => {
    const items = [
      {
        id: 'x',
        label: 'Com extras',
        icon: 'star',
        badge: { label: 'Novo', variant: 'positive' as const },
        content: null,
      },
    ]
    render(<Accordion items={items} />)
    expect(screen.getByText('star')).toBeInTheDocument()
    expect(screen.getByText('Novo')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Accordion items={ITEMS} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Tabs from './Tabs'

const ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'reports', label: 'Relatórios', badge: 3 },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
]

describe('Tabs', () => {
  it('renders a tablist with one tab per item', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('labels each tab with its item label', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByRole('tab', { name: 'Início' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Relatórios/i })).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected=true', () => {
    render(<Tabs items={ITEMS} activeId="reports" />)
    const [tab0, tab1, tab2] = screen.getAllByRole('tab')
    expect(tab0).toHaveAttribute('aria-selected', 'false')
    expect(tab1).toHaveAttribute('aria-selected', 'true')
    expect(tab2).toHaveAttribute('aria-selected', 'false')
  })

  it('all tabs have aria-selected=false when no activeId', () => {
    render(<Tabs items={ITEMS} />)
    screen
      .getAllByRole('tab')
      .forEach((tab) => expect(tab).toHaveAttribute('aria-selected', 'false'))
  })

  it('calls onChange with the tab id when clicked', async () => {
    const onChange = vi.fn()
    render(<Tabs items={ITEMS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('tab', { name: /Relatórios/i }))
    expect(onChange).toHaveBeenCalledWith('reports')
  })

  it('renders a badge counter when badge is provided', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders the icon text when icon is provided', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByText('settings')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Tabs items={ITEMS} activeId="home" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

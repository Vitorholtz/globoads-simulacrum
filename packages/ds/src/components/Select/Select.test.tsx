import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Select from './Select'

const OPTIONS = [
  { value: 'op1', label: 'Opção 1' },
  { value: 'op2', label: 'Opção 2' },
  { value: 'op3', label: 'Opção 3' },
]

describe('Select', () => {
  it('renders label and placeholder', () => {
    render(<Select label="País" placeholder="Selecione um país" options={OPTIONS} />)
    expect(screen.getByText('País')).toBeInTheDocument()
    expect(screen.getByText('Selecione um país')).toBeInTheDocument()
  })

  it('opens the listbox on trigger click', async () => {
    render(<Select options={OPTIONS} />)
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the listbox on Escape', async () => {
    render(<Select options={OPTIONS} />)
    const trigger = screen.getByRole('button')
    await userEvent.click(trigger)
    await userEvent.keyboard('{Escape}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('selects an option on mousedown and calls onChange', async () => {
    const onChange = vi.fn()
    render(<Select options={OPTIONS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button'))
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Opção 2' }))
    expect(onChange).toHaveBeenCalledWith('op2')
  })

  it('shows the selected option label in the trigger after selection', async () => {
    render(<Select options={OPTIONS} />)
    await userEvent.click(screen.getByRole('button'))
    fireEvent.mouseDown(screen.getByRole('option', { name: 'Opção 1' }))
    expect(screen.getByRole('button')).toHaveTextContent('Opção 1')
  })

  it('shows the pre-selected label when defaultValue is set', () => {
    render(<Select options={OPTIONS} defaultValue="op3" />)
    expect(screen.getByRole('button')).toHaveTextContent('Opção 3')
  })

  it('updates when controlled value prop changes', () => {
    const { rerender } = render(<Select options={OPTIONS} value="op1" onChange={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveTextContent('Opção 1')
    rerender(<Select options={OPTIONS} value="op3" onChange={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveTextContent('Opção 3')
  })

  it('disables the trigger when disabled prop is set', () => {
    render(<Select options={OPTIONS} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows error message and sets aria-invalid on the trigger', () => {
    render(<Select options={OPTIONS} errorMessage="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true')
  })

  it('opens the dropdown on ArrowDown key', () => {
    render(<Select options={OPTIONS} />)
    const trigger = screen.getByRole('button')
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Select label="País" options={OPTIONS} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

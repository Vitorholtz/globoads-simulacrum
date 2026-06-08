import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import DatePicker from './DatePicker'

describe('DatePicker', () => {
  it('renders input with DD/MM/AAAA placeholder', () => {
    render(<DatePicker />)
    expect(screen.getByPlaceholderText('DD/MM/AAAA')).toBeInTheDocument()
  })

  it('renders the label', () => {
    render(<DatePicker label="Data de nascimento" />)
    expect(screen.getByText('Data de nascimento')).toBeInTheDocument()
  })

  it('applies date mask as the user types', async () => {
    render(<DatePicker />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '01052025')
    expect(input).toHaveValue('01/05/2025')
  })

  it('shows "Data inválida" and aria-invalid for an impossible date', async () => {
    render(<DatePicker />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '30022025')
    expect(screen.getByText('Data inválida')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows external errorMessage prop', () => {
    render(<DatePicker errorMessage="Data obrigatória" />)
    expect(screen.getByText('Data obrigatória')).toBeInTheDocument()
  })

  it('clears aria-invalid when input is cleared after an error', async () => {
    render(<DatePicker />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '30022025')
    await userEvent.clear(input)
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
  })

  it('disables input and calendar button when disabled', () => {
    render(<DatePicker disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Abrir calendário' })).toBeDisabled()
  })

  it('displays initial value in DD/MM/YYYY format when controlled', () => {
    render(<DatePicker value={new Date(2025, 0, 15)} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('15/01/2025')
  })

  it('updates displayed value when controlled value prop changes', () => {
    const { rerender } = render(<DatePicker value={new Date(2025, 0, 15)} onChange={vi.fn()} />)
    rerender(<DatePicker value={new Date(2025, 11, 31)} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('31/12/2025')
  })

  it('calendar button has correct aria-label and aria-haspopup', () => {
    render(<DatePicker />)
    const btn = screen.getByRole('button', { name: 'Abrir calendário' })
    expect(btn).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('renders "(opcional)" tag when optional is true', () => {
    render(<DatePicker label="Data" optional />)
    expect(screen.getByText('Opcional')).toBeInTheDocument()
  })

  it('hides label visually when showLabel is false', () => {
    render(<DatePicker label="Data de início" showLabel={false} />)
    expect(screen.queryByText('Data de início')).not.toBeInTheDocument()
  })

  it('renders description tooltip trigger when descriptionText is provided', () => {
    render(<DatePicker label="Data" descriptionText="Use o formato DD/MM/AAAA." />)
    expect(screen.getByRole('button', { name: 'Mais informações' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DatePicker label="Data" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

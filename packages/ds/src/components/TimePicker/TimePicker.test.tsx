import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import TimePicker from './TimePicker'

describe('TimePicker', () => {
  it('renders input with HH:MM placeholder', () => {
    render(<TimePicker />)
    expect(screen.getByPlaceholderText('HH:MM')).toBeInTheDocument()
  })

  it('renders the label', () => {
    render(<TimePicker label="Horário de início" />)
    expect(screen.getByText('Horário de início')).toBeInTheDocument()
  })

  it('applies time mask as the user types', async () => {
    render(<TimePicker />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '1530')
    expect(input).toHaveValue('15:30')
  })

  it('shows "Horário inválido" and aria-invalid for an impossible time', async () => {
    render(<TimePicker />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '2575')
    expect(screen.getByText('Horário inválido')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows external errorMessage prop', () => {
    render(<TimePicker errorMessage="Horário obrigatório" />)
    expect(screen.getByText('Horário obrigatório')).toBeInTheDocument()
  })

  it('clears aria-invalid when input is cleared after an error', async () => {
    render(<TimePicker />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, '2575')
    await userEvent.clear(input)
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
  })

  it('disables input and trigger button when disabled', () => {
    render(<TimePicker disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Abrir seletor de horário' })).toBeDisabled()
  })

  it('displays initial value in HH:MM format when controlled', () => {
    render(<TimePicker value={{ hours: 9, minutes: 5 }} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('09:05')
  })

  it('updates displayed value when controlled value prop changes', () => {
    const { rerender } = render(<TimePicker value={{ hours: 9, minutes: 5 }} onChange={vi.fn()} />)
    rerender(<TimePicker value={{ hours: 18, minutes: 45 }} onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('18:45')
  })

  it('trigger button has correct aria-label and aria-haspopup', () => {
    render(<TimePicker />)
    const btn = screen.getByRole('button', { name: 'Abrir seletor de horário' })
    expect(btn).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('renders "(opcional)" tag when optional is true', () => {
    render(<TimePicker label="Horário" optional />)
    expect(screen.getByText('Opcional')).toBeInTheDocument()
  })

  it('hides label visually when showLabel is false', () => {
    render(<TimePicker label="Horário de início" showLabel={false} />)
    expect(screen.queryByText('Horário de início')).not.toBeInTheDocument()
  })

  it('renders description tooltip trigger when descriptionText is provided', () => {
    render(<TimePicker label="Horário" descriptionText="Use o formato HH:MM." />)
    expect(screen.getByRole('button', { name: 'Mais informações' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<TimePicker label="Horário" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

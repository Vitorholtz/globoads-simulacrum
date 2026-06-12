import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import DateTimePicker from './DateTimePicker'

const SOME_DATE = new Date(2025, 4, 26) // 26/05/2025
const TOGGLE_NAME = 'Abrir seletor de data e horário'
const MONTHS_PT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

function pendingDateLabel(date: Date): string {
  return `${date.getDate()} de ${MONTHS_PT[date.getMonth()]}/ ${date.getFullYear()}`
}

describe('DateTimePicker', () => {
  it('renders date and time inputs with placeholders', () => {
    render(<DateTimePicker />)
    expect(screen.getByPlaceholderText('DD/MM/AAAA')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('HH:MM')).toBeInTheDocument()
  })

  it('renders an arrow icon separating date and time', () => {
    render(<DateTimePicker label="Início" />)
    expect(screen.getByText('east')).toBeInTheDocument()
  })

  it('renders the label', () => {
    render(<DateTimePicker label="Início da campanha" />)
    expect(screen.getByText('Início da campanha')).toBeInTheDocument()
  })

  it('displays the formatted date and time when defaultValue is set', () => {
    render(<DateTimePicker defaultValue={{ date: SOME_DATE, time: { hours: 14, minutes: 30 } }} />)
    expect(screen.getByDisplayValue('26/05/2025')).toBeInTheDocument()
    expect(screen.getByDisplayValue('14:30')).toBeInTheDocument()
  })

  it('opens showing the calendar (date step) first', async () => {
    render(<DateTimePicker label="Início" />)
    await userEvent.click(screen.getByRole('button', { name: TOGGLE_NAME }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: /^15 de/ })).toBeInTheDocument()
    expect(
      within(dialog).queryByRole('button', { name: 'Voltar para a data' })
    ).not.toBeInTheDocument()
  })

  it('advances to the time step after confirming a date, showing the selected date', async () => {
    render(<DateTimePicker label="Início" />)
    await userEvent.click(screen.getByRole('button', { name: TOGGLE_NAME }))

    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: /^15 de/ }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Confirmar' }))

    const today = new Date()
    expect(
      screen.getByText(pendingDateLabel(new Date(today.getFullYear(), today.getMonth(), 15)))
    ).toBeInTheDocument()
    expect(within(dialog).getByText('Horas')).toBeInTheDocument()
    expect(within(dialog).getByText('Minutos')).toBeInTheDocument()
  })

  it('completes the full flow and calls onChange with the combined value', async () => {
    const onChange = vi.fn()
    render(<DateTimePicker label="Início" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: TOGGLE_NAME }))

    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: /^15 de/ }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Confirmar' }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Confirmar' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    const result = onChange.mock.calls[0][0]
    expect(result.date.getDate()).toBe(15)
    expect(result.time).toEqual({ hours: 0, minutes: 0 })

    expect(screen.getByPlaceholderText('DD/MM/AAAA')).toHaveValue(
      `15/${String(result.date.getMonth() + 1).padStart(2, '0')}/${result.date.getFullYear()}`
    )
    expect(screen.getByPlaceholderText('HH:MM')).toHaveValue('00:00')
  })

  it('"Voltar" returns from the time step to the date step', async () => {
    render(<DateTimePicker label="Início" />)
    await userEvent.click(screen.getByRole('button', { name: TOGGLE_NAME }))

    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: /^15 de/ }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Confirmar' }))
    await userEvent.click(within(dialog).getByRole('button', { name: 'Voltar para a data' }))

    expect(within(dialog).getByRole('button', { name: /^15 de/ })).toBeInTheDocument()
    expect(
      within(dialog).queryByRole('button', { name: 'Voltar para a data' })
    ).not.toBeInTheDocument()
  })

  it('"Cancelar" closes the panel without calling onChange', async () => {
    const onChange = vi.fn()
    render(<DateTimePicker label="Início" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: TOGGLE_NAME }))

    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' }))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('typing a valid date and time calls onChange with the combined value', async () => {
    const onChange = vi.fn()
    render(<DateTimePicker label="Início" onChange={onChange} />)

    await userEvent.type(screen.getByPlaceholderText('DD/MM/AAAA'), '26052025')
    expect(onChange).not.toHaveBeenCalled()

    await userEvent.type(screen.getByPlaceholderText('HH:MM'), '1430')
    expect(onChange).toHaveBeenCalledTimes(1)
    const result = onChange.mock.calls[0][0]
    expect(result.date.getDate()).toBe(26)
    expect(result.time).toEqual({ hours: 14, minutes: 30 })
  })

  it('reflects typed date and time into the calendar and time panel', async () => {
    render(<DateTimePicker label="Início" />)

    await userEvent.type(screen.getByPlaceholderText('DD/MM/AAAA'), '15062026')
    await userEvent.type(screen.getByPlaceholderText('HH:MM'), '0945')

    await userEvent.click(screen.getByRole('button', { name: TOGGLE_NAME }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('button', { name: /^15 de/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    )

    await userEvent.click(within(dialog).getByRole('button', { name: 'Confirmar' }))

    expect(screen.getByText(pendingDateLabel(new Date(2026, 5, 15)))).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Horas: 09')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Minutos: 45')).toBeInTheDocument()
  })

  it('shows an inline error message when the typed date is invalid', async () => {
    render(<DateTimePicker label="Início" />)
    await userEvent.type(screen.getByPlaceholderText('DD/MM/AAAA'), '99992025')
    expect(screen.getByText('Data ou horário inválidos.')).toBeInTheDocument()
  })

  it('disables the inputs and toggle when disabled', () => {
    render(<DateTimePicker disabled />)
    expect(screen.getByPlaceholderText('DD/MM/AAAA')).toBeDisabled()
    expect(screen.getByPlaceholderText('HH:MM')).toBeDisabled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders "(opcional)" tag when optional is true', () => {
    render(<DateTimePicker label="Início" optional />)
    expect(screen.getByText('Opcional')).toBeInTheDocument()
  })

  it('hides label visually when showLabel is false', () => {
    render(<DateTimePicker label="Início da campanha" showLabel={false} />)
    expect(screen.queryByText('Início da campanha')).not.toBeInTheDocument()
  })

  it('shows external errorMessage prop', () => {
    render(<DateTimePicker errorMessage="Data e horário obrigatórios" />)
    expect(screen.getByText('Data e horário obrigatórios')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DateTimePicker label="Início" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

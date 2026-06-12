import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import TimePanel from './TimePanel'

describe('TimePanel', () => {
  it('renders Horas/Minutos labels and the current value', () => {
    render(<TimePanel value={{ hours: 15, minutes: 30 }} onChange={vi.fn()} />)
    expect(screen.getByText('Horas')).toBeInTheDocument()
    expect(screen.getByText('Minutos')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('increments hours by 1', async () => {
    const onChange = vi.fn()
    render(<TimePanel value={{ hours: 10, minutes: 0 }} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar horas' }))
    expect(onChange).toHaveBeenCalledWith({ hours: 11, minutes: 0 })
  })

  it('wraps hours from 23 to 0 when incrementing', async () => {
    const onChange = vi.fn()
    render(<TimePanel value={{ hours: 23, minutes: 0 }} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar horas' }))
    expect(onChange).toHaveBeenCalledWith({ hours: 0, minutes: 0 })
  })

  it('wraps hours from 0 to 23 when decrementing', async () => {
    const onChange = vi.fn()
    render(<TimePanel value={{ hours: 0, minutes: 0 }} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Diminuir horas' }))
    expect(onChange).toHaveBeenCalledWith({ hours: 23, minutes: 0 })
  })

  it('increments minutes by 10', async () => {
    const onChange = vi.fn()
    render(<TimePanel value={{ hours: 0, minutes: 20 }} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar minutos' }))
    expect(onChange).toHaveBeenCalledWith({ hours: 0, minutes: 30 })
  })

  it('wraps minutes from 50 to 0 when incrementing', async () => {
    const onChange = vi.fn()
    render(<TimePanel value={{ hours: 0, minutes: 50 }} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar minutos' }))
    expect(onChange).toHaveBeenCalledWith({ hours: 0, minutes: 0 })
  })

  it('wraps minutes from 0 to 50 when decrementing', async () => {
    const onChange = vi.fn()
    render(<TimePanel value={{ hours: 0, minutes: 0 }} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Diminuir minutos' }))
    expect(onChange).toHaveBeenCalledWith({ hours: 0, minutes: 50 })
  })

  it('renders Cancelar/Confirmar buttons and fires their callbacks', async () => {
    const onCancel = vi.fn()
    const onConfirm = vi.fn()
    render(
      <TimePanel
        value={{ hours: 8, minutes: 0 }}
        onChange={vi.fn()}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    await userEvent.click(screen.getByRole('button', { name: 'Confirmar' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('omits the footer when no onConfirm/onCancel are provided', () => {
    render(<TimePanel value={{ hours: 8, minutes: 0 }} onChange={vi.fn()} />)
    expect(screen.queryByRole('button', { name: 'Cancelar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Confirmar' })).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TimePanel
        value={{ hours: 8, minutes: 0 }}
        onChange={vi.fn()}
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

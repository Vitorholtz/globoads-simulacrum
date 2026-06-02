import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clique</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Salvar</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Salvar
      </Button>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies primary variant class by default', () => {
    const { container } = render(<Button>OK</Button>)
    expect(container.firstChild).toHaveClass('primary')
  })

  it('applies secondary variant class', () => {
    const { container } = render(<Button variant="secondary">OK</Button>)
    expect(container.firstChild).toHaveClass('secondary')
  })

  it('applies danger class when danger prop is true', () => {
    const { container } = render(<Button danger>Excluir</Button>)
    expect(container.firstChild).toHaveClass('danger')
  })
})

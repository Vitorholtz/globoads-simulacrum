import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StateMatrix from './StateMatrix'

const COLUMNS = [
  { id: 'empty', label: 'Vazio' },
  { id: 'filled', label: 'Preenchido' },
]
const ROWS = [
  { id: 'default', label: 'Default' },
  { id: 'hover', label: 'Hover' },
  { id: 'error', label: 'Error' },
]

describe('StateMatrix', () => {
  it('renders a header cell per column', () => {
    render(<StateMatrix columns={COLUMNS} rows={ROWS} renderCell={() => null} />)
    expect(screen.getByText('Vazio')).toBeInTheDocument()
    expect(screen.getByText('Preenchido')).toBeInTheDocument()
  })

  it('renders a label per row', () => {
    render(<StateMatrix columns={COLUMNS} rows={ROWS} renderCell={() => null} />)
    expect(screen.getByText('Default')).toBeInTheDocument()
    expect(screen.getByText('Hover')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('calls renderCell once per row × column', () => {
    let calls = 0
    render(<StateMatrix columns={COLUMNS} rows={ROWS} renderCell={() => (calls++, null)} />)
    expect(calls).toBe(ROWS.length * COLUMNS.length)
  })

  it('renders cell content from renderCell', () => {
    render(
      <StateMatrix
        columns={COLUMNS}
        rows={ROWS}
        renderCell={(row, col) => <span>{`${row.id}-${col.id}`}</span>}
      />
    )
    expect(screen.getByText('default-empty')).toBeInTheDocument()
    expect(screen.getByText('error-filled')).toBeInTheDocument()
  })

  it('applies getCellClassName to matching cells', () => {
    const { container } = render(
      <StateMatrix
        columns={COLUMNS}
        rows={ROWS}
        renderCell={() => null}
        getCellClassName={(row) => (row.id === 'error' ? 'flagged' : undefined)}
      />
    )
    expect(container.querySelectorAll('.flagged')).toHaveLength(COLUMNS.length)
  })

  it('renders a group header with name and description', () => {
    render(
      <StateMatrix
        columns={COLUMNS}
        rows={ROWS}
        renderCell={() => null}
        group
        header={{ name: 'Tipo Padrão', description: 'tipo padrão' }}
      />
    )
    expect(screen.getByText('Tipo Padrão')).toBeInTheDocument()
    expect(screen.getByText('— tipo padrão')).toBeInTheDocument()
  })

  it('omits the description span when none is given', () => {
    render(
      <StateMatrix
        columns={COLUMNS}
        rows={ROWS}
        renderCell={() => null}
        group
        header={{ name: 'Inverter' }}
      />
    )
    expect(screen.queryByText(/^—/)).not.toBeInTheDocument()
  })

  it('applies modifier classes for layout variants', () => {
    const { container } = render(
      <StateMatrix
        columns={COLUMNS}
        rows={ROWS}
        renderCell={() => null}
        align="start"
        cellPad="sm"
        overflow="visible"
      />
    )
    const root = container.firstChild as HTMLElement
    expect(root.className).toMatch(/alignStart/)
    expect(root.className).toMatch(/cellPadSm/)
    expect(root.className).toMatch(/overflowVisible/)
  })
})

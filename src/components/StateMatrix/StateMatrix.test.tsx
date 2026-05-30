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

  it('drives layout knobs via CSS custom properties', () => {
    const { container } = render(
      <StateMatrix
        columns={COLUMNS}
        rows={ROWS}
        renderCell={() => null}
        labelWidth={120}
        align="start"
        cellPad="sm"
        overflow="visible"
      />
    )
    const root = container.firstChild as HTMLElement
    expect(root.style.getPropertyValue('--sm-label-width')).toBe('120px')
    expect(root.style.getPropertyValue('--sm-align')).toBe('flex-start')
    expect(root.style.getPropertyValue('--sm-overflow')).toBe('visible')
  })
})

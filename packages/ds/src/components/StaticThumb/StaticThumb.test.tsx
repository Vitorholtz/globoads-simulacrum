import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import StaticThumb from './StaticThumb'

const IMG = '/campaign-talent.jpg'
const VIDEO = '/video-cafe-orfeu-gerador-de-criativos.mp4'

describe('StaticThumb', () => {
  it('renders an image preview with no zoom icon and no interaction', () => {
    render(<StaticThumb type="image" src={IMG} alt="Talento da campanha" />)
    expect(screen.getByAltText('Talento da campanha')).toBeInTheDocument()
    expect(screen.queryByText('zoom_in')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders a video preview with the duration and no play icon', () => {
    render(<StaticThumb type="video" src={VIDEO} duration="1:40" />)
    expect(screen.getByText('1:40')).toBeInTheDocument()
    expect(screen.queryByText('play_arrow')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('never opens a modal on click', async () => {
    const { container } = render(<StaticThumb type="image" src={IMG} alt="x" />)
    await userEvent.click(container.firstElementChild as Element)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<StaticThumb type="image" src={IMG} alt="Talento da campanha" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import InteractiveThumb from './InteractiveThumb'

const IMG = '/campaign-talent.jpg'
const VIDEO = '/video-cafe-orfeu-gerador-de-criativos.mp4'

describe('InteractiveThumb', () => {
  it('renders an image thumb with an "ampliar" accessible name and the image', () => {
    render(<InteractiveThumb type="image" src={IMG} alt="Talento da campanha" />)
    expect(
      screen.getByRole('button', { name: 'Ampliar imagem: Talento da campanha' })
    ).toBeInTheDocument()
    expect(screen.getByAltText('Talento da campanha')).toBeInTheDocument()
  })

  it('renders a video thumb with a "reproduzir" name and the duration', () => {
    render(<InteractiveThumb type="video" src={VIDEO} duration="1:40" />)
    expect(screen.getByRole('button', { name: 'Reproduzir vídeo' })).toBeInTheDocument()
    expect(screen.getByText('1:40')).toBeInTheDocument()
  })

  it('applies the forced state for showcase', () => {
    render(<InteractiveThumb type="image" src={IMG} alt="x" forceState="focus" />)
    expect(screen.getByRole('button', { name: /Ampliar imagem/ })).toHaveAttribute(
      'data-force-state',
      'focus'
    )
  })

  it('opens a modal with the enlarged image on click', async () => {
    render(<InteractiveThumb type="image" src={IMG} alt="Talento da campanha" />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Ampliar imagem/ }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByAltText('Talento da campanha')).toBeInTheDocument()
  })

  it('opens a modal that plays the video on click', async () => {
    render(<InteractiveThumb type="video" src={VIDEO} duration="1:40" />)
    await userEvent.click(screen.getByRole('button', { name: 'Reproduzir vídeo' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog.querySelector('video[controls]')).toBeInTheDocument()
  })

  // O unmount final ocorre no onAnimationEnd; como o jsdom não roda animações CSS
  // (mesma limitação dos pickers/drawer do DS), verificamos que o fechamento é
  // iniciado: o painel entra no estado de saída ao acionar fechar ou Escape.
  it('starts closing when the close button is clicked', async () => {
    render(<InteractiveThumb type="image" src={IMG} alt="x" />)
    await userEvent.click(screen.getByRole('button', { name: /Ampliar imagem/ }))
    const dialog = screen.getByRole('dialog')
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(dialog.className).toMatch(/Leaving/)
  })

  it('starts closing when Escape is pressed', async () => {
    render(<InteractiveThumb type="image" src={IMG} alt="x" />)
    await userEvent.click(screen.getByRole('button', { name: /Ampliar imagem/ }))
    const dialog = screen.getByRole('dialog')
    await userEvent.keyboard('{Escape}')
    expect(dialog.className).toMatch(/Leaving/)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <InteractiveThumb type="image" src={IMG} alt="Talento da campanha" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

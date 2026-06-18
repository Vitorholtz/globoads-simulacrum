import { describe, it, expect } from 'vitest'
import { serializeText, parseTextBySchema } from './creativeText'
import type { CreativeTextContent } from '../../components/CreativeCard/types'

describe('creativeText — ida e volta (serialize ↔ parse)', () => {
  const cta: CreativeTextContent = {
    variant: 'cta',
    ctaText: 'Assine agora',
    buttonColor: '#F2630A',
    textColor: '#FFFFFF',
  }
  const titulo: CreativeTextContent = {
    variant: 'titulo-subtitulo',
    title: 'Café Orfeu',
    subtitle: 'O melhor da serra na sua xícara',
  }

  it('reconstrói o CTA gravado', () => {
    expect(parseTextBySchema(serializeText(cta), 'cta')).toEqual(cta)
  })

  it('reconstrói o título/subtítulo gravado', () => {
    expect(parseTextBySchema(serializeText(titulo), 'titulo-subtitulo')).toEqual(titulo)
  })
})

describe('creativeText — leitura tolerante de CTA', () => {
  it('aceita separador ":" e chaves com acento/maiúsculas', () => {
    const raw = ['CTA: Compre já', 'corBotão = #f2630a', 'Cor Texto: #ffffff'].join('\n')
    expect(parseTextBySchema(raw, 'cta')).toEqual({
      variant: 'cta',
      ctaText: 'Compre já',
      buttonColor: '#F2630A',
      textColor: '#FFFFFF',
    })
  })

  it('não confunde a cor do botão com a cor do texto', () => {
    const raw = 'cta=Ir\ncorBotao=#111111\ncorTexto=#222222'
    const parsed = parseTextBySchema(raw, 'cta')
    expect(parsed).toMatchObject({ buttonColor: '#111111', textColor: '#222222' })
  })

  it('ignora linhas sem separador e mantém o primeiro valor de uma chave repetida', () => {
    const raw =
      'comentário sem igual\ncta=Primeiro\ncta=Segundo\ncorBotao=#000000\ncorTexto=#ffffff'
    expect(parseTextBySchema(raw, 'cta')).toMatchObject({ ctaText: 'Primeiro' })
  })

  it('retorna null quando falta um dos três campos', () => {
    expect(parseTextBySchema('cta=Só o texto\ncorBotao=#000000', 'cta')).toBeNull()
  })

  it('normaliza o hex (adiciona # e deixa maiúsculo)', () => {
    const parsed = parseTextBySchema('cta=X\ncorBotao=abc123\ncorTexto=#deF', 'cta')
    expect(parsed).toMatchObject({ buttonColor: '#ABC123', textColor: '#DEF' })
  })
})

describe('creativeText — leitura tolerante de título/subtítulo', () => {
  it('resolve subtítulo antes de título (subtitulo contém titulo)', () => {
    const raw = 'titulo=Principal\nsubtitulo=Secundário'
    expect(parseTextBySchema(raw, 'titulo-subtitulo')).toEqual({
      variant: 'titulo-subtitulo',
      title: 'Principal',
      subtitle: 'Secundário',
    })
  })

  it('retorna null quando falta o subtítulo', () => {
    expect(parseTextBySchema('titulo=Só o título', 'titulo-subtitulo')).toBeNull()
  })
})

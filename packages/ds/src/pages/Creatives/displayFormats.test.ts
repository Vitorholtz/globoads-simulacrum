import { describe, it, expect } from 'vitest'
import { matchDisplayFormat, matchCompositeFormat, type ExtractedAsset } from './displayFormats'

const img = (width: number, height: number): ExtractedAsset => ({ kind: 'image', width, height })
const text = (): ExtractedAsset => ({ kind: 'text' })

describe('matchDisplayFormat — formato simples por dimensão exata', () => {
  it('casa a dimensão de um formato simples', () => {
    expect(matchDisplayFormat(970, 250)?.id).toBe('billboard')
    expect(matchDisplayFormat(300, 600)?.id).toBe('half-page')
  })

  it('casa qualquer uma das dimensões de um formato com várias (Sticky Ad)', () => {
    expect(matchDisplayFormat(320, 50)?.id).toBe('sticky-ad')
    expect(matchDisplayFormat(320, 100)?.id).toBe('sticky-ad')
  })

  it('uma imagem solta 996x640 é Pause Ads (simples), nunca Binge Ads (composto)', () => {
    // Garantia documentada: formatos compostos compartilham dimensões com simples,
    // mas só são alcançáveis via .zip — uma imagem solta não pode cair neles.
    expect(matchDisplayFormat(996, 640)?.id).toBe('pause-ads')
  })

  it('ignora dimensões que só existem em formatos compostos', () => {
    // 1920x100 só existe no Touchpoint (composto) — não há formato simples.
    expect(matchDisplayFormat(1920, 100)).toBeNull()
  })

  it('retorna null para dimensão fora do catálogo', () => {
    expect(matchDisplayFormat(123, 456)).toBeNull()
  })
})

describe('matchCompositeFormat — formato composto por conjunto de peças', () => {
  it('identifica o Touchpoint Imagético (desktop + mobile + texto)', () => {
    expect(matchCompositeFormat([img(1920, 100), img(430, 140), text()])?.id).toBe(
      'touchpoint-imagetico'
    )
  })

  it('identifica o Carrossel (imagens 400x300 + texto)', () => {
    const assets = [img(400, 300), img(400, 300), img(400, 300), img(400, 300), text()]
    expect(matchCompositeFormat(assets)?.id).toBe('carrossel')
  })

  it('identifica o Binge Ads (peça principal + logotipo)', () => {
    expect(matchCompositeFormat([img(996, 640), img(25, 25)])?.id).toBe('binge-ads')
  })

  it('é tolerante: identifica o formato mesmo com peças faltando', () => {
    // Só a peça desktop do Touchpoint já basta para identificar o formato;
    // a validação detalhada (em classifyZip) é que acusa a peça que falta.
    expect(matchCompositeFormat([img(1920, 100)])?.id).toBe('touchpoint-imagetico')
  })

  it('retorna null quando não há imagem que case com nenhum formato', () => {
    expect(matchCompositeFormat([text()])).toBeNull()
    expect(matchCompositeFormat([img(123, 456)])).toBeNull()
    expect(matchCompositeFormat([])).toBeNull()
  })
})

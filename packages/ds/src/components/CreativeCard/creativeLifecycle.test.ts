import { describe, it, expect } from 'vitest'
import {
  CREATIVE_STATUS,
  applyTransition,
  initialValidationSteps,
  addedOnlyValidation,
  formatStepTimestamp,
} from './creativeLifecycle'
import type { Creative, CreativeState } from './types'

function makeCreative(state: CreativeState, overrides: Partial<Creative> = {}): Creative {
  return {
    id: 'c1',
    name: 'banner.jpg',
    imageSrc: 'blob:banner',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '100 kB',
    uploadedAt: '07/07 às 16h15',
    state,
    ...overrides,
  }
}

describe('CREATIVE_STATUS — apresentação derivada do estado', () => {
  it('mapeia cada estado para rótulo e variante', () => {
    expect(CREATIVE_STATUS.configuring).toMatchObject({
      label: 'Pronto para anunciar',
      variant: 'neutral',
    })
    expect(CREATIVE_STATUS.analyzing).toMatchObject({ label: 'Em análise', variant: 'warning' })
    expect(CREATIVE_STATUS.approved).toMatchObject({ label: 'Aprovado', variant: 'success' })
    expect(CREATIVE_STATUS.rejected).toMatchObject({ label: 'Recusado', variant: 'critical' })
  })

  it('só o estado recusado tem link de detalhes', () => {
    expect(CREATIVE_STATUS.rejected.link).toBe('Ver detalhes')
    expect(CREATIVE_STATUS.configuring.link).toBeUndefined()
    expect(CREATIVE_STATUS.analyzing.link).toBeUndefined()
    expect(CREATIVE_STATUS.approved.link).toBeUndefined()
  })
})

describe('applyTransition — transições válidas', () => {
  it('send: configuring → analyzing e anexa o passo "em análise"', () => {
    const next = applyTransition(makeCreative('configuring'), 'send')
    expect(next.state).toBe('analyzing')
    expect(next.validation?.at(-1)).toMatchObject({ type: 'analyzing' })
  })

  it('approve: analyzing → approved e anexa o passo "aprovado"', () => {
    const next = applyTransition(makeCreative('analyzing'), 'approve')
    expect(next.state).toBe('approved')
    expect(next.validation?.at(-1)).toMatchObject({ type: 'approved' })
  })

  it('reject: analyzing → rejected, anexa o passo com o motivo informado', () => {
    const next = applyTransition(makeCreative('analyzing'), 'reject', ['Logo fora da área segura.'])
    expect(next.state).toBe('rejected')
    expect(next.validation?.at(-1)).toMatchObject({
      type: 'rejected',
      reason: ['Logo fora da área segura.'],
    })
  })

  it('reject sem motivo usa um texto padrão', () => {
    const next = applyTransition(makeCreative('analyzing'), 'reject')
    expect(next.validation?.at(-1)?.reason).toEqual(['Motivo não informado.'])
  })

  it('preserva os passos anteriores ao anexar', () => {
    const base = makeCreative('configuring', {
      validation: addedOnlyValidation('01/01/2026 às 10:00h'),
    })
    const next = applyTransition(base, 'send')
    expect(next.validation).toHaveLength(2)
    expect(next.validation?.[0]).toMatchObject({ type: 'added' })
  })
})

describe('applyTransition — transições inválidas e imutabilidade', () => {
  it('ignora uma ação inválida para o estado atual (devolve o mesmo criativo)', () => {
    const base = makeCreative('configuring')
    expect(applyTransition(base, 'approve')).toBe(base)
    expect(applyTransition(makeCreative('approved'), 'send').state).toBe('approved')
  })

  it('não muta o criativo de origem', () => {
    const base = makeCreative('analyzing', { validation: [] })
    applyTransition(base, 'approve')
    expect(base.state).toBe('analyzing')
    expect(base.validation).toHaveLength(0)
  })
})

describe('construtores de linha do tempo', () => {
  it('initialValidationSteps começa com "adicionado" + "em análise"', () => {
    const steps = initialValidationSteps('07/07/2024 às 16:15h')
    expect(steps.map((s) => s.type)).toEqual(['added', 'analyzing'])
  })

  it('addedOnlyValidation tem só o passo "adicionado" com link de vínculo', () => {
    const steps = addedOnlyValidation('07/07/2024 às 16:15h')
    expect(steps).toHaveLength(1)
    expect(steps[0]).toMatchObject({ type: 'added' })
    expect(steps[0].link).toBeTruthy()
  })

  it('formatStepTimestamp formata como DD/MM/AAAA às HH:MMh com zero à esquerda', () => {
    expect(formatStepTimestamp(new Date(2024, 6, 7, 9, 5))).toBe('07/07/2024 às 09:05h')
  })
})

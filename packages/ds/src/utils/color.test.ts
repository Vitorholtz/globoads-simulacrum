import { describe, it, expect } from 'vitest'
import { hexLuminance, isLightColor } from './color'

describe('hexLuminance', () => {
  it('returns 1 for white (#ffffff)', () => {
    expect(hexLuminance('#ffffff')).toBeCloseTo(1, 5)
  })

  it('returns 0 for black (#000000)', () => {
    expect(hexLuminance('#000000')).toBeCloseTo(0, 5)
  })

  it('works without leading #', () => {
    expect(hexLuminance('ffffff')).toBeCloseTo(1, 5)
  })

  it('returns a value in [0, 1]', () => {
    const value = hexLuminance('#185CFB') // brand blue
    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThanOrEqual(1)
  })

  it('returns correct relative luminance for mid-gray (#808080)', () => {
    // WCAG formula for #808080 ≈ 0.2158
    expect(hexLuminance('#808080')).toBeCloseTo(0.2158, 2)
  })
})

describe('isLightColor', () => {
  it('returns true for white', () => {
    expect(isLightColor('#ffffff')).toBe(true)
  })

  it('returns false for black', () => {
    expect(isLightColor('#000000')).toBe(false)
  })

  it('returns false for mid-gray (#808080)', () => {
    expect(isLightColor('#808080')).toBe(false)
  })

  it('returns false for brand blue (#185CFB)', () => {
    expect(isLightColor('#185CFB')).toBe(false)
  })

  it('returns true for a very light color (#f0f0f0)', () => {
    expect(isLightColor('#f0f0f0')).toBe(true)
  })
})

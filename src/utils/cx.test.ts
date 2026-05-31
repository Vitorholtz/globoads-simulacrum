import { describe, it, expect } from 'vitest'
import { cx } from './cx'

describe('cx', () => {
  it('joins truthy strings', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c')
  })
  it('filters falsy values', () => {
    expect(cx('a', false, null, undefined, 'b')).toBe('a b')
  })
  it('returns empty string when all args are falsy', () => {
    expect(cx(false, null, undefined)).toBe('')
  })
  it('handles a single class', () => {
    expect(cx('only')).toBe('only')
  })
})

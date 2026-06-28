import DimensionRow from '../../components/docs/DimensionRow/DimensionRow'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import { BORDER_RADIUS_TOKENS } from '../../tokens/borderRadius'
import { BORDER_WIDTH_TOKENS } from '../../tokens/borderWidth'
import { SPACING_TOKENS } from '../../tokens/spacing'
import Section from '../../components/docs/Section/Section'
import styles from './DimensionsEffectsPage.module.css'

export default function DimensionsEffectsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Foundation"
        title="Dimensões e Efeitos"
        subtitle="Escalas de espaçamento, espessura de borda e raio de borda do sistema. Esses tokens definem distâncias entre elementos, paddings de componentes e geometria de cantos."
        stats={[
          { value: SPACING_TOKENS.length, label: 'tokens de espaçamento' },
          { value: BORDER_WIDTH_TOKENS.length, label: 'tokens de espessura' },
          { value: BORDER_RADIUS_TOKENS.length, label: 'tokens de raio' },
        ]}
      />

      <Section icon="straighten" title="Espaçamentos" count={SPACING_TOKENS.length}>
        <div className={styles.tokenList}>
          {SPACING_TOKENS.map((token) => (
            <DimensionRow key={token.variable} token={token}>
              {token.valuePx > 0 && (
                <div className={styles.spacingBar} style={{ width: `var(${token.variable})` }} />
              )}
            </DimensionRow>
          ))}
        </div>
      </Section>

      <Section icon="border_style" title="Espessuras de Borda" count={BORDER_WIDTH_TOKENS.length}>
        <div className={styles.tokenList}>
          {BORDER_WIDTH_TOKENS.map((token) => (
            <DimensionRow key={token.variable} token={token}>
              <div
                className={`${styles.borderWidthBox} ${token.valuePx === 0 ? styles.borderWidthNone : ''}`}
                style={token.valuePx > 0 ? { borderWidth: `var(${token.variable})` } : undefined}
              />
            </DimensionRow>
          ))}
        </div>
      </Section>

      <Section icon="rounded_corner" title="Raios de Borda" count={BORDER_RADIUS_TOKENS.length}>
        <div className={styles.tokenList}>
          {BORDER_RADIUS_TOKENS.map((token) => (
            <DimensionRow key={token.variable} token={token}>
              <div
                className={styles.borderRadiusBox}
                style={{ borderRadius: `var(${token.variable})` }}
              />
            </DimensionRow>
          ))}
        </div>
      </Section>
    </div>
  )
}

import BorderRadiusRow from '../../components/BorderRadiusRow/BorderRadiusRow'
import BorderWidthRow from '../../components/BorderWidthRow/BorderWidthRow'
import PageHeader from '../../components/PageHeader/PageHeader'
import SpacingRow from '../../components/SpacingRow/SpacingRow'
import { BORDER_RADIUS_TOKENS } from '../../tokens/borderRadius'
import { BORDER_WIDTH_TOKENS } from '../../tokens/borderWidth'
import { SPACING_TOKENS } from '../../tokens/spacing'
import Section from '../../components/Section/Section'
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
            <SpacingRow key={token.variable} token={token} />
          ))}
        </div>
      </Section>

      <Section icon="border_style" title="Espessuras de Borda" count={BORDER_WIDTH_TOKENS.length}>
        <div className={styles.tokenList}>
          {BORDER_WIDTH_TOKENS.map((token) => (
            <BorderWidthRow key={token.variable} token={token} />
          ))}
        </div>
      </Section>

      <Section icon="rounded_corner" title="Raios de Borda" count={BORDER_RADIUS_TOKENS.length}>
        <div className={styles.tokenList}>
          {BORDER_RADIUS_TOKENS.map((token) => (
            <BorderRadiusRow key={token.variable} token={token} />
          ))}
        </div>
      </Section>
    </div>
  )
}

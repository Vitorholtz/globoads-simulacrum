import CardGrid from '../../components/docs/CardGrid/CardGrid'
import TokenCard from '../../components/docs/TokenCard/TokenCard'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import { FOCUS_TOKENS } from '../../tokens/focus'
import { SHADOW_TOKENS } from '../../tokens/shadow'
import styles from './EffectsPage.module.css'

export default function EffectsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Foundation"
        title="Efeitos"
        subtitle="Tokens de efeitos visuais do sistema. Sombras criam hierarquia de elevação; estilos de foco garantem acessibilidade em todos os componentes interativos."
        stats={[
          { value: SHADOW_TOKENS.length, label: 'tokens de sombra' },
          { value: FOCUS_TOKENS.length, label: 'estilos de foco' },
        ]}
      />

      <Section icon="shadow" title="Sombras" count={SHADOW_TOKENS.length}>
        <CardGrid>
          {SHADOW_TOKENS.map((token) => (
            <TokenCard
              key={token.variable}
              preview={
                <div className={styles.circle} style={{ boxShadow: `var(${token.variable})` }} />
              }
              name={token.name}
              variable={token.variable}
              value={token.cssValue}
            />
          ))}
        </CardGrid>
      </Section>

      <Section icon="center_focus_strong" title="Estilos de foco" count={FOCUS_TOKENS.length}>
        <CardGrid>
          {FOCUS_TOKENS.map((token) => (
            <TokenCard
              key={token.variable}
              preview={
                <div className={styles.rect} style={{ boxShadow: `var(${token.variable})` }} />
              }
              name={token.name}
              variable={token.variable}
              value={token.cssValue}
              description={token.useCase}
            />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}

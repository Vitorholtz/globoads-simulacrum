import CardGrid from '../../components/docs/CardGrid/CardGrid'
import FocusCard from '../../components/docs/FocusCard/FocusCard'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import ShadowRow from '../../components/docs/ShadowRow/ShadowRow'
import { FOCUS_TOKENS } from '../../tokens/focus'
import { SHADOW_TOKENS } from '../../tokens/shadow'
import Section from '../../components/docs/Section/Section'

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
            <ShadowRow key={token.variable} token={token} />
          ))}
        </CardGrid>
      </Section>

      <Section icon="center_focus_strong" title="Estilos de foco" count={FOCUS_TOKENS.length}>
        <CardGrid>
          {FOCUS_TOKENS.map((token) => (
            <FocusCard key={token.variable} token={token} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}

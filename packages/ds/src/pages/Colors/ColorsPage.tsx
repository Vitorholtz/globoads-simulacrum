import { COLOR_GROUPS } from '../../tokens/colors'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import ColorSwatch from '../../components/docs/ColorSwatch/ColorSwatch'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'

const GROUP_ICONS: Record<string, string> = {
  Fill: 'format_color_fill',
  Surface: 'layers',
  Border: 'border_outer',
  'Cores de Ação': 'touch_app',
  'Cores de Luminosidade': 'opacity',
}

export default function ColorsPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Foundation"
        title="Colors"
        subtitle="Tokens semânticos de cor do Globo Ads Design System. Utilize sempre os tokens — nunca valores hexadecimais diretamente — para garantir consistência visual, hierarquia e acessibilidade em toda a interface."
        stats={COLOR_GROUPS.map((g) => ({ value: g.tokens.length, label: g.label }))}
      />
      {COLOR_GROUPS.map((group) => (
        <Section
          key={group.label}
          icon={GROUP_ICONS[group.label]}
          title={group.label}
          count={group.tokens.length}
          description={group.description}
        >
          <CardGrid>
            {group.tokens.map((token) => (
              <ColorSwatch key={token.variable} token={token} />
            ))}
          </CardGrid>
        </Section>
      ))}
    </div>
  )
}

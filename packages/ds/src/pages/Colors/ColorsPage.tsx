import { COLOR_GROUPS } from '../../tokens/colors'
import ColorGroup from '../../components/docs/ColorGroup/ColorGroup'
import PageHeader from '../../components/docs/PageHeader/PageHeader'

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
        <ColorGroup key={group.label} group={group} icon={GROUP_ICONS[group.label]} />
      ))}
    </div>
  )
}

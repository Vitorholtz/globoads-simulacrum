import type { DiariaProduto } from '../../../../data/diarias'
import { getAdFormat, getFormatSvg, getPrimaryDimension } from '../../../../data/rules/formats'
import FormatsAccordion, {
  type FormatListItem,
} from '../../../../components/FormatsAccordion/FormatsAccordion'

interface DiariasFormatsAccordionProps {
  produto: DiariaProduto
  label?: string
}

function toItems(produto: DiariaProduto): FormatListItem[] {
  return produto.formats.map((f) => {
    const dim = getPrimaryDimension(f.formatId)
    return {
      id: f.formatId,
      name: getAdFormat(f.formatId)?.name ?? f.formatId,
      svgPath: getFormatSvg(f.formatId) || undefined,
      fallbackIcon: f.formatId === 'in-stream-video' ? 'play_circle' : 'image',
      specs: dim ? `${dim.width}×${dim.height}${f.devices ? ` • ${f.devices}` : ''}` : undefined,
      positions: f.positions,
    }
  })
}

export default function DiariasFormatsAccordion({
  produto,
  label = 'Formatos incluídos',
}: DiariasFormatsAccordionProps) {
  return <FormatsAccordion items={toItems(produto)} label={label} />
}

import {
  getAdFormat,
  getFormatSvg,
  getPrimaryDimension,
  type ImpressoesProduto,
} from '../../../../data'
import FormatsAccordion, {
  type FormatListItem,
} from '../../../../components/FormatsAccordion/FormatsAccordion'

interface ImpressoesFormatsAccordionProps {
  produto: ImpressoesProduto
}

function toItems(produto: ImpressoesProduto): FormatListItem[] {
  return produto.formatIds.flatMap((formatId) => {
    const fmt = getAdFormat(formatId)
    if (!fmt) return []
    const dim = getPrimaryDimension(formatId)
    const devices = fmt.devices.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')
    return [
      {
        id: formatId,
        name: fmt.name,
        svgPath: getFormatSvg(formatId) || undefined,
        fallbackIcon: formatId === 'in-stream-video' ? 'play_circle' : 'image',
        specs: dim ? `${dim.width}×${dim.height} • ${devices}` : undefined,
      },
    ]
  })
}

export default function ImpressoesFormatsAccordion({ produto }: ImpressoesFormatsAccordionProps) {
  return <FormatsAccordion items={toItems(produto)} />
}

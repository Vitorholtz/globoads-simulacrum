import Tooltip from '../../components/Tooltip/Tooltip'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import { TOOLTIP_POSITIONS, TOOLTIP_ALIGNMENTS, TOOLTIP_GUIDELINES } from '../../tokens/tooltip'
import type { TooltipPosition } from '../../tokens/tooltip'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import styles from './TooltipPage.module.css'

function TriggerIcon() {
  return (
    <button type="button" className={styles.trigger} aria-label="Mais informações">
      <span className={`material-symbols-rounded icon-md ${styles.triggerIcon}`} aria-hidden="true">
        info
      </span>
    </button>
  )
}

const POSITION_PADDING: Record<TooltipPosition, string> = {
  up: styles.padUp,
  bottom: styles.padBottom,
  right: styles.padRight,
  left: styles.padLeft,
}

export default function TooltipPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Utilities"
        title="Tooltip"
        subtitle="Tooltips são rótulos flutuantes que explicam brevemente a função de um elemento da interface. Acionados por hover, foco ou toque, aparecem próximos ao elemento acionador sem interromper o fluxo da tela."
        stats={[
          { value: 4, label: 'Posições' },
          { value: 3, label: 'Alinhamentos' },
          { value: 4, label: 'Diretrizes' },
        ]}
      />

      {/* ── Componente ── */}
      <Section icon="tooltip" title="Componente">
        <div className={styles.componentDemo}>
          <div className={styles.componentDemoInner}>
            <Tooltip text="Editar campanha" position="up" align="middle">
              <TriggerIcon />
            </Tooltip>
            <Tooltip text="Duplicar item" position="up" align="middle">
              <TriggerIcon />
            </Tooltip>
            <Tooltip text="Excluir seleção" position="up" align="middle">
              <TriggerIcon />
            </Tooltip>
          </div>
          <p className={`type-caption-sm ${styles.componentHint}`}>
            Passe o mouse sobre os ícones para ver o Tooltip
          </p>
        </div>
      </Section>

      {/* ── Posições ── */}
      <Section icon="open_with" title="Posições" count={TOOLTIP_POSITIONS.length}>
        <CardGrid>
          {TOOLTIP_POSITIONS.map((pos) => (
            <div key={pos.id} className={styles.positionCard}>
              <div className={[styles.positionPreview, POSITION_PADDING[pos.id]].join(' ')}>
                <Tooltip text="Tooltip" position={pos.id} align="middle" forceVisible>
                  <TriggerIcon />
                </Tooltip>
              </div>
              <div className={styles.cardBody}>
                <span className={`type-body-sm ${styles.cardLabel}`}>{pos.label}</span>
                <span className={`type-body-sm ${styles.cardDesc}`}>{pos.description}</span>
              </div>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* ── Alinhamentos ── */}
      <Section icon="align_horizontal_left" title="Alinhamentos" count={TOOLTIP_ALIGNMENTS.length}>
        <CardGrid>
          {TOOLTIP_ALIGNMENTS.map((align) => (
            <div key={align.id} className={styles.alignCard}>
              <div className={[styles.alignPreview, styles.padUp].join(' ')}>
                <Tooltip text="Tooltip" position="up" align={align.id} forceVisible>
                  <TriggerIcon />
                </Tooltip>
              </div>
              <div className={styles.cardBody}>
                <span className={`type-body-sm ${styles.cardLabel}`}>{align.label}</span>
                <span className={`type-body-sm ${styles.cardDesc}`}>{align.description}</span>
              </div>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={TOOLTIP_GUIDELINES} />
      </Section>
    </div>
  )
}

import Collapse from '../../components/Collapse/Collapse'
import PageHeader from '../../components/PageHeader/PageHeader'
import {
  COLLAPSE_SIZES,
  COLLAPSE_STATES,
  COLLAPSE_GUIDELINES,
  COLLAPSE_MATRIX_STATES,
  COLLAPSE_DEMO_ITEMS,
  COLLAPSE_PREVIEW_TEXT,
} from '../../tokens/collapse'
import GuidelinesGrid from '../../components/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/Section/Section'
import styles from './CollapsePage.module.css'

export default function CollapsePage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Utilities"
        title="Collapse"
        subtitle='O Collapse exibe um texto parcialmente visível e permite ao usuário revelar o restante com um clique em "Ver mais". Ideal para descrições longas, termos e detalhes secundários que não precisam ocupar espaço sempre.'
        stats={[
          { value: 4, label: 'Tamanhos' },
          { value: 4, label: 'Estados' },
          { value: 2, label: 'Direções' },
        ]}
      />

      {/* ── Estilos ── */}
      <Section icon="unfold_more" title="Estilos de Conteúdo" count="2 estilos">
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <div className={styles.previewBox}>
                <Collapse size="md" lines={3}>
                  <p className={`type-body-sm ${styles.previewBodyText}`}>
                    {COLLAPSE_PREVIEW_TEXT}
                  </p>
                </Collapse>
              </div>
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Recolhido</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                O texto é truncado ao número de linhas configurado. O acionador "Ver mais" com seta
                para baixo aparece imediatamente abaixo.
              </span>
            </div>
          </div>

          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <div className={styles.previewBox}>
                <Collapse size="md" lines={3} defaultOpen>
                  <p className={`type-body-sm ${styles.previewBodyText}`}>
                    {COLLAPSE_PREVIEW_TEXT}
                  </p>
                </Collapse>
              </div>
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Expandido</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                O texto completo é exibido. O acionador muda para "Ver menos" com a seta rotacionada
                para cima.
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Escala de tamanhos ── */}
      <Section
        icon="straighten"
        title="Escala de Tamanhos"
        count={`${COLLAPSE_SIZES.length} tamanhos`}
      >
        <div className={styles.sizeScaleContainer}>
          {COLLAPSE_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Collapse size={s.id} lines={2}>
                  <p className={`type-body-sm ${styles.sizePreviewText}`}>
                    {COLLAPSE_PREVIEW_TEXT}
                  </p>
                </Collapse>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-body-sm ${styles.sizeLabel}`}>{s.label}</span>
                  {s.recommended && (
                    <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>
                  )}
                </div>
                <span className={`type-body-sm ${styles.sizeDescription}`}>{s.description}</span>
              </div>
              <div className={`type-caption-sm ${styles.sizeSpecs}`}>
                <span>
                  font {s.fontSize}px · icon {s.iconSize}px
                </span>
                <br />
                <span>
                  line-height {s.lineHeight}px · gap {s.gap}px
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estados ── */}
      <Section icon="toggle_on" title="Estados" count={`${COLLAPSE_STATES.length} estados`}>
        <div className={styles.stateMatrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            <div className={`type-caption-xs ${styles.matrixCellLabel}`}>Ver mais</div>
            <div className={`type-caption-xs ${styles.matrixCellLabel}`}>Ver menos</div>
          </div>

          {COLLAPSE_MATRIX_STATES.map((state) => (
            <div key={state.id} className={styles.matrixRow}>
              <div className={styles.matrixStateLabel}>
                <span className={`type-caption-sm ${styles.matrixStateName}`}>{state.label}</span>
              </div>
              <div className={styles.matrixCells}>
                <div className={styles.matrixCell}>
                  <Collapse size="md" open={false} forceState={state.force} />
                </div>
                <div className={styles.matrixCell}>
                  <Collapse size="md" open={true} forceState={state.force} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Demo Interativo ── */}
      <Section icon="touch_app" title="Demo Interativo">
        <div className={styles.demoContainer}>
          {COLLAPSE_DEMO_ITEMS.map((item, i) => (
            <div
              key={item.key}
              className={[
                styles.demoItem,
                i < COLLAPSE_DEMO_ITEMS.length - 1 ? styles.demoItemBorder : '',
              ].join(' ')}
            >
              <div className={styles.demoMeta}>
                <span className={`type-body-sm ${styles.demoLabel}`}>{item.label}</span>
                <span className={`type-caption-xs ${styles.demoSize}`}>
                  {item.size.toUpperCase()}
                </span>
              </div>
              <Collapse size={item.size} lines={3}>
                <p className={`type-body-sm ${styles.demoBodyText}`}>{item.text}</p>
              </Collapse>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={COLLAPSE_GUIDELINES} />
      </Section>
    </div>
  )
}

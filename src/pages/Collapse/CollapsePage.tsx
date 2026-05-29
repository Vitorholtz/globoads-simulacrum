import Collapse from '../../components/Collapse/Collapse'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import { COLLAPSE_SIZES, COLLAPSE_STATES, COLLAPSE_GUIDELINES } from '../../tokens/collapse'
import styles from './CollapsePage.module.css'

type ForceState = 'hover' | 'focus' | 'active' | undefined

const MATRIX_STATES: { id: string; label: string; force: ForceState }[] = [
  { id: 'normal',  label: 'Normal',  force: undefined },
  { id: 'hover',   label: 'Hover',   force: 'hover' },
  { id: 'focus',   label: 'Focus',   force: 'focus' },
  { id: 'active',  label: 'Active',  force: 'active' },
]

const LONG_TEXT = 'A segmentação desta campanha está configurada para atingir usuários entre 25 e 45 anos, residentes nas regiões Sudeste e Sul do Brasil. O público-alvo inclui pessoas com interesse em esportes, entretenimento digital e consumo de mídia online. A frequência máxima de exibição está limitada a 3 impressões por usuário por dia, garantindo relevância sem saturação. O período de exclusão cobre os últimos 30 dias de conversão para evitar reimpacto de usuários que já converteram. Estimativa de alcance semanal: 2,4 milhões de usuários únicos.'

const DEMO_ITEMS = [
  {
    key: 'segmentacao',
    size: 'lg' as const,
    text: 'A segmentação desta campanha está configurada para atingir usuários entre 25 e 45 anos, residentes nas regiões Sudeste e Sul do Brasil. O público-alvo inclui pessoas com interesse em esportes, entretenimento digital e consumo de mídia online. A frequência máxima de exibição está limitada a 3 impressões por usuário por dia, garantindo relevância sem saturação. O período de exclusão cobre os últimos 30 dias de conversão para evitar reimpacto de usuários que já converteram. Estimativa de alcance semanal: 2,4 milhões de usuários únicos, com CPM médio projetado de R$ 18,50.',
    label: 'Sobre a segmentação',
  },
  {
    key: 'specs',
    size: 'md' as const,
    text: 'O formato Video Bumper exige arquivos MP4 ou WebM com resolução mínima de 1280×720px e duração fixa de 6 segundos. O peso máximo aceito é 50 MB, com taxa de bits de vídeo de até 8 Mbps e codec H.264 ou VP9. O áudio deve estar codificado em AAC-LC com amostragem de 44.1 kHz. Legendas no formato SRT são opcionais mas recomendadas para garantir acessibilidade e desempenho em reproduções sem som. Arquivos fora das especificações serão rejeitados automaticamente durante o processo de upload.',
    label: 'Especificações técnicas',
  },
  {
    key: 'termos',
    size: 'sm' as const,
    text: 'A veiculação deste anúncio está sujeita às políticas de conteúdo da Globo Ads e às diretrizes de publicidade responsável do CONAR. O anunciante é o único responsável pela veracidade das informações divulgadas e pela conformidade com a LGPD no tratamento de dados coletados via píxel de conversão. Campanhas com conteúdo sensível — incluindo produtos financeiros, saúde e bebidas alcoólicas — requerem aprovação prévia da equipe de moderação com antecedência mínima de 48 horas úteis antes da data de início da veiculação.',
    label: 'Termos de veiculação',
  },
]

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
      <section className={styles.section}>
        <SectionHeader icon="unfold_more" title="Estilos de Conteúdo" count="2 estilos" />
        <div className={styles.stylesGrid}>
          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <div className={styles.previewBox}>
                <Collapse size="md" lines={3}>
                  <p className={`type-body-sm ${styles.previewBodyText}`}>{LONG_TEXT}</p>
                </Collapse>
              </div>
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Recolhido</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                O texto é truncado ao número de linhas configurado. O acionador "Ver mais" com seta para baixo aparece imediatamente abaixo.
              </span>
            </div>
          </div>

          <div className={styles.styleCard}>
            <div className={styles.stylePreview}>
              <div className={styles.previewBox}>
                <Collapse size="md" lines={3} defaultOpen>
                  <p className={`type-body-sm ${styles.previewBodyText}`}>{LONG_TEXT}</p>
                </Collapse>
              </div>
            </div>
            <div className={styles.styleBody}>
              <span className={`type-body-sm ${styles.styleName}`}>Expandido</span>
              <span className={`type-body-sm ${styles.styleDesc}`}>
                O texto completo é exibido. O acionador muda para "Ver menos" com a seta rotacionada para cima.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Escala de tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader icon="straighten" title="Escala de Tamanhos" count={`${COLLAPSE_SIZES.length} tamanhos`} />
        <div className={styles.sizeScaleContainer}>
          {COLLAPSE_SIZES.map((s) => (
            <div key={s.id} className={styles.sizeRow}>
              <div className={styles.sizePreview}>
                <Collapse size={s.id} lines={2}>
                  <p className={`type-body-sm ${styles.sizePreviewText}`}>{LONG_TEXT}</p>
                </Collapse>
              </div>
              <div className={styles.sizeMeta}>
                <div className={styles.sizeValueRow}>
                  <span className={`type-body-sm ${styles.sizeLabel}`}>{s.label}</span>
                  {s.recommended && <span className={`type-caption-sm ${styles.sizeRecommended}`}>Recomendado</span>}
                </div>
                <span className={`type-body-sm ${styles.sizeDescription}`}>{s.description}</span>
              </div>
              <div className={`type-caption-sm ${styles.sizeSpecs}`}>
                <span>font {s.fontSize}px · icon {s.iconSize}px</span><br />
                <span>line-height {s.lineHeight}px · gap {s.gap}px</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Estados ── */}
      <section className={styles.section}>
        <SectionHeader icon="toggle_on" title="Estados" count={`${COLLAPSE_STATES.length} estados`} />
        <div className={styles.stateMatrixContainer}>
          <div className={styles.matrixHeaderRow}>
            <div className={styles.matrixHeaderSpacer} />
            <div className={`type-caption-xs ${styles.matrixCellLabel}`}>Ver mais</div>
            <div className={`type-caption-xs ${styles.matrixCellLabel}`}>Ver menos</div>
          </div>

          {MATRIX_STATES.map((state) => (
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
      </section>

      {/* ── Demo Interativo ── */}
      <section className={styles.section}>
        <SectionHeader icon="touch_app" title="Demo Interativo" />
        <div className={styles.demoContainer}>
          {DEMO_ITEMS.map((item, i) => (
            <div
              key={item.key}
              className={[styles.demoItem, i < DEMO_ITEMS.length - 1 ? styles.demoItemBorder : ''].join(' ')}
            >
              <div className={styles.demoMeta}>
                <span className={`type-body-sm ${styles.demoLabel}`}>{item.label}</span>
                <span className={`type-caption-xs ${styles.demoSize}`}>{item.size.toUpperCase()}</span>
              </div>
              <Collapse size={item.size} lines={3}>
                <p className={`type-body-sm ${styles.demoBodyText}`}>{item.text}</p>
              </Collapse>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {COLLAPSE_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={`type-body-md ${styles.guidelineTitle}`}>{g.title}</h3>
              <p className={`type-body-sm ${styles.guidelineBody}`}>{g.body}</p>
              <div className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

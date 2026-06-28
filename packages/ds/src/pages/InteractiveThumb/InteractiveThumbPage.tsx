import InteractiveThumb from '../../components/InteractiveThumb/InteractiveThumb'
import Badge from '../../components/Badge/Badge'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import {
  INTERACTIVE_THUMB_TYPES,
  INTERACTIVE_THUMB_STATES,
  INTERACTIVE_THUMB_GUIDELINES,
} from '../../tokens/interactiveThumb'
import styles from './InteractiveThumbPage.module.css'

const IMG = '/campaign-talent.jpg'
const VIDEO = '/video-cafe-orfeu-gerador-de-criativos.mp4'
const BILLBOARD = '/Billboard.jpg'
const IMG_ALT = 'Talento da campanha'
const DEMO_DURATION = '1:40'

const RESPONSIVE_BOXES = [
  { label: '96 × 96', cls: 'boxSquare' },
  { label: '220 × 124', cls: 'boxLandscape' },
  { label: '124 × 200', cls: 'boxPortrait' },
] as const

export default function InteractiveThumbPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Visual resources"
        title="Interactive Thumb"
        subtitle="Miniatura interativa para apresentar conteúdos visuais e permitir ações de visualização do asset. Ao clicar, abre a imagem ampliada ou reproduz o vídeo em um modal. Ocupa 100% do container — adapta-se a qualquer tamanho e proporção do contexto."
        stats={[
          { value: INTERACTIVE_THUMB_TYPES.length, label: 'Tipos' },
          { value: INTERACTIVE_THUMB_STATES.length, label: 'Estados' },
        ]}
      />

      {/* ── Tipos ── */}
      <Section icon="collections" title="Tipos" count={INTERACTIVE_THUMB_TYPES.length}>
        <CardGrid>
          <DemoCard
            preview={
              <div className={styles.demoBox}>
                <InteractiveThumb type="image" src={IMG} alt={IMG_ALT} />
              </div>
            }
            title="Image"
            description={INTERACTIVE_THUMB_TYPES[0].description}
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.demoBox}>
                <InteractiveThumb type="video" src={VIDEO} duration={DEMO_DURATION} />
              </div>
            }
            title="Video"
            description={INTERACTIVE_THUMB_TYPES[1].description}
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Badge ── */}
      <Section
        icon="sell"
        title="Badge"
        description="Slot opcional no canto inferior direito (prop `badge`). Aceita qualquer conteúdo — normalmente um Badge de formato, mas serve para qualquer sinalização. No hover/foco, recua junto com a duração para dar lugar ao backdrop."
      >
        <div className={styles.boxes}>
          <div className={styles.demo}>
            <div className={styles.demoBox}>
              <InteractiveThumb
                type="image"
                src={BILLBOARD}
                alt="Billboard Clube Orfeu"
                badge={<Badge variant="neutral" label="Billboard" />}
              />
            </div>
            <span className={`type-caption-sm ${styles.boxLabel}`}>Image</span>
          </div>
          <div className={styles.demo}>
            <div className={styles.demoBox}>
              <InteractiveThumb
                type="video"
                src={VIDEO}
                duration={DEMO_DURATION}
                badge={<Badge variant="neutral" label="In-Stream Vídeo" />}
              />
            </div>
            <span className={`type-caption-sm ${styles.boxLabel}`}>Video</span>
          </div>
        </div>
      </Section>

      {/* ── Responsividade ── */}
      <Section
        icon="aspect_ratio"
        title="Responsividade"
        description="O mesmo thumb não tem dimensão própria: ocupa o container e se adapta a qualquer proporção. A mídia cabe inteira no container, sem corte, e os overlays acompanham o redimensionamento."
      >
        <div className={styles.responsive}>
          {INTERACTIVE_THUMB_TYPES.map((t) => (
            <div key={t.id} className={styles.responsiveRow}>
              <span className={`type-caption-md ${styles.rowLabel}`}>{t.label}</span>
              <div className={styles.boxes}>
                {RESPONSIVE_BOXES.map((box) => (
                  <div key={box.label} className={styles.demo}>
                    <div className={styles[box.cls]}>
                      <InteractiveThumb
                        type={t.id}
                        src={t.id === 'video' ? VIDEO : IMG}
                        alt={t.id === 'video' ? undefined : IMG_ALT}
                        duration={t.id === 'video' ? DEMO_DURATION : undefined}
                      />
                    </div>
                    <span className={`type-caption-sm ${styles.boxLabel}`}>{box.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Estados ── */}
      <Section icon="animation" title="Estados" count={INTERACTIVE_THUMB_STATES.length}>
        <StateMatrix
          columns={INTERACTIVE_THUMB_TYPES}
          rows={INTERACTIVE_THUMB_STATES}
          align="center"
          renderCell={(row, col) => {
            const isVideo = col.id === 'video'
            return (
              <div className={isVideo ? styles.matrixVideo : styles.matrixImage}>
                <InteractiveThumb
                  type={col.id}
                  src={isVideo ? VIDEO : IMG}
                  alt={isVideo ? undefined : IMG_ALT}
                  duration={isVideo ? DEMO_DURATION : undefined}
                  forceState={
                    row.id === 'normal' ? undefined : (row.id as 'hover' | 'focus' | 'active')
                  }
                />
              </div>
            )
          }}
        />
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={INTERACTIVE_THUMB_GUIDELINES} />
      </Section>
    </div>
  )
}

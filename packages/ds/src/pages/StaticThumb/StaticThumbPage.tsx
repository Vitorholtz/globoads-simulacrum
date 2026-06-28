import StaticThumb from '../../components/StaticThumb/StaticThumb'
import Badge from '../../components/Badge/Badge'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import { STATIC_THUMB_TYPES, STATIC_THUMB_GUIDELINES } from '../../tokens/staticThumb'
import styles from './StaticThumbPage.module.css'

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

export default function StaticThumbPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Visual resources"
        title="Static Thumb"
        subtitle="Miniatura estática (sem interatividade) para apresentar e identificar conteúdos visuais. Compartilha a moldura do Interactive Thumb, mas sem lupa, hover ou modal. Ocupa 100% do container — adapta-se a qualquer tamanho e proporção do contexto."
        stats={[{ value: STATIC_THUMB_TYPES.length, label: 'Tipos' }]}
      />

      {/* ── Tipos ── */}
      <Section icon="collections" title="Tipos" count={STATIC_THUMB_TYPES.length}>
        <CardGrid>
          <DemoCard
            preview={
              <div className={styles.demoBox}>
                <StaticThumb type="image" src={IMG} alt={IMG_ALT} />
              </div>
            }
            title="Image"
            description={STATIC_THUMB_TYPES[0].description}
            previewPad="lg"
          />
          <DemoCard
            preview={
              <div className={styles.demoBox}>
                <StaticThumb type="video" src={VIDEO} duration={DEMO_DURATION} />
              </div>
            }
            title="Video"
            description={STATIC_THUMB_TYPES[1].description}
            previewPad="lg"
          />
        </CardGrid>
      </Section>

      {/* ── Badge ── */}
      <Section
        icon="sell"
        title="Badge"
        description="Slot opcional no canto inferior direito (prop `badge`). Aceita qualquer conteúdo — normalmente um Badge de formato, mas serve para qualquer sinalização."
      >
        <div className={styles.boxes}>
          <div className={styles.demo}>
            <div className={styles.demoBox}>
              <StaticThumb
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
              <StaticThumb
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
        description="O mesmo thumb não tem dimensão própria: ocupa o container e se adapta a qualquer proporção. A mídia cabe inteira no container, sem corte, e a duração do vídeo acompanha o redimensionamento."
      >
        <div className={styles.responsive}>
          {STATIC_THUMB_TYPES.map((t) => (
            <div key={t.id} className={styles.responsiveRow}>
              <span className={`type-caption-md ${styles.rowLabel}`}>{t.label}</span>
              <div className={styles.boxes}>
                {RESPONSIVE_BOXES.map((box) => (
                  <div key={box.label} className={styles.demo}>
                    <div className={styles[box.cls]}>
                      <StaticThumb
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

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={STATIC_THUMB_GUIDELINES} />
      </Section>
    </div>
  )
}

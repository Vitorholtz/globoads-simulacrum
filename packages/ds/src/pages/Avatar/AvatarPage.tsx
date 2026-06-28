import Avatar from '../../components/Avatar/Avatar'
import AvatarGroup from '../../components/AvatarGroup/AvatarGroup'
import {
  AVATAR_SIZES,
  AVATAR_VARIANTS,
  AVATAR_GUIDELINES,
  AVATAR_GROUP_GUIDELINES,
} from '../../tokens/avatar'
import type { AvatarSize, AvatarVariant } from '../../tokens/avatar'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import styles from './AvatarPage.module.css'

const DEMO_NAME = 'Ana Maria Braga'
const DEMO_SRC_PHOTO = '/avatar-photo.png'

const GROUP_INITIALS_ITEMS = [
  { name: 'Ana Braga' },
  { name: 'Bruno Costa' },
  { name: 'Clara Dias' },
]

const GROUP_PLACEHOLDER_ITEMS = [{}, {}, {}]

const GROUP_PHOTO_ITEMS = [
  { src: '/avatar-photo.png' },
  { src: '/avatar-photo2.png' },
  { src: '/avatar-photo3.png' },
]

const GROUP_LABEL = '7 pessoas curtiram'

export default function AvatarPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Visual resources"
        title="Avatar"
        subtitle="Avatares são usados para mostrar uma representação em miniatura de um indivíduo ou empresa na interface. Por padrão, a variação Initials exibe as iniciais do primeiro e do último nome."
        stats={[
          { value: AVATAR_VARIANTS.length, label: 'Variantes' },
          { value: AVATAR_SIZES.length, label: 'Tamanhos' },
        ]}
      />

      {/* ── Variantes ── */}
      <Section icon="person" title="Variantes" count={AVATAR_VARIANTS.length}>
        <CardGrid>
          {AVATAR_VARIANTS.map((v) => (
            <DemoCard
              key={v.id}
              preview={
                <Avatar
                  size="xl"
                  variant={v.id as AvatarVariant}
                  name={DEMO_NAME}
                  src={v.id === 'photo' ? DEMO_SRC_PHOTO : undefined}
                />
              }
              title={v.label}
              description={v.description}
              previewPad="lg"
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Escala de Tamanhos ── */}
      <Section icon="straighten" title="Escala de Tamanhos" count={AVATAR_SIZES.length}>
        <div className={styles.sizesContainer}>
          <div className={styles.sizesHeader}>
            <div className={styles.sizesRowLabel} />
            {AVATAR_VARIANTS.map((v) => (
              <div key={v.id} className={`type-caption-md ${styles.sizesColHeader}`}>
                {v.label}
              </div>
            ))}
          </div>
          {AVATAR_SIZES.map((s) => (
            <div key={s.id} className={styles.sizesRow}>
              <div className={styles.sizesRowLabel}>
                <span className={`type-caption-md ${styles.sizeLabel}`}>{s.label}</span>
                <span className={`type-caption-sm ${styles.sizePx}`}>{s.px}px</span>
                {s.recommended && (
                  <span className={`type-caption-xs ${styles.sizeTag}`}>Recomendado</span>
                )}
              </div>
              {AVATAR_VARIANTS.map((v) => (
                <div key={v.id} className={styles.sizesCell}>
                  <Avatar
                    size={s.id as AvatarSize}
                    variant={v.id as AvatarVariant}
                    name={DEMO_NAME}
                    src={v.id === 'photo' ? DEMO_SRC_PHOTO : undefined}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Lógica de Iniciais ── */}
      <Section icon="abc" title="Lógica de Iniciais">
        <div className={styles.initialsContainer}>
          <div className={styles.initialsDemo}>
            <div className={styles.initialsExample}>
              <span className={`type-body-md ${styles.initialsName}`}>{DEMO_NAME}</span>
              <span className={`type-caption-md ${styles.initialsArrow}`}>→</span>
              <Avatar size="md" variant="initial" name={DEMO_NAME} />
              <span className={`type-caption-md ${styles.initialsResult}`}>AB</span>
            </div>
            <p className={`type-body-sm ${styles.initialsNote}`}>
              As iniciais são extraídas do primeiro caractere do primeiro nome e do primeiro
              caractere do último nome. Em tamanho XS, apenas a inicial do primeiro nome é exibida.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Avatar Group ── */}
      <Section icon="group" title="Avatar Group">
        <p className={`type-body-md ${styles.groupDescription}`}>
          Grupos de avatares são usados para mostrar um conjunto de indivíduos na interface.
          Suportam três variantes: <strong>Initials</strong>, <strong>Placeholders</strong> e{' '}
          <strong>Photos</strong>.
        </p>
        <div className={styles.groupsContainer}>
          <div className={styles.groupsHeader}>
            <div className={styles.groupsHeaderSpacer} />
            <div className={`type-caption-md ${styles.groupsHeaderCell}`}>Initials</div>
            <div className={`type-caption-md ${styles.groupsHeaderCell}`}>Placeholders</div>
            <div className={`type-caption-md ${styles.groupsHeaderCell}`}>Photos</div>
          </div>
          <div className={styles.groupsRow}>
            <div className={`type-caption-md ${styles.groupsRowLabel}`}>Com texto</div>
            <div className={styles.groupsCell}>
              <AvatarGroup items={GROUP_INITIALS_ITEMS} label={GROUP_LABEL} />
            </div>
            <div className={styles.groupsCell}>
              <AvatarGroup items={GROUP_PLACEHOLDER_ITEMS} label={GROUP_LABEL} />
            </div>
            <div className={styles.groupsCell}>
              <AvatarGroup items={GROUP_PHOTO_ITEMS} label={GROUP_LABEL} />
            </div>
          </div>
          <div className={styles.groupsRow}>
            <div className={`type-caption-md ${styles.groupsRowLabel}`}>Sem texto</div>
            <div className={styles.groupsCell}>
              <AvatarGroup items={GROUP_INITIALS_ITEMS} />
            </div>
            <div className={styles.groupsCell}>
              <AvatarGroup items={GROUP_PLACEHOLDER_ITEMS} />
            </div>
            <div className={styles.groupsCell}>
              <AvatarGroup items={GROUP_PHOTO_ITEMS} />
            </div>
          </div>
        </div>

        <GuidelinesGrid items={AVATAR_GROUP_GUIDELINES} className={styles.groupGuidelinesGrid} />
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={AVATAR_GUIDELINES} />
      </Section>
    </div>
  )
}

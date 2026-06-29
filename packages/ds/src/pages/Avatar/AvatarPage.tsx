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
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import StateMatrix from '../../components/docs/StateMatrix/StateMatrix'
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
        <StateMatrix
          columns={[...AVATAR_VARIANTS]}
          rows={AVATAR_SIZES.map((s) => ({
            id: s.id,
            label: s.recommended
              ? `${s.label} · ${s.px}px · Recomendado`
              : `${s.label} · ${s.px}px`,
          }))}
          renderCell={(row, col) => (
            <Avatar
              size={row.id as AvatarSize}
              variant={col.id as AvatarVariant}
              name={DEMO_NAME}
              src={col.id === 'photo' ? DEMO_SRC_PHOTO : undefined}
            />
          )}
        />
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
        <StateMatrix
          columns={[
            { id: 'initial', label: 'Initials' },
            { id: 'placeholder', label: 'Placeholders' },
            { id: 'photo', label: 'Photos' },
          ]}
          rows={[
            { id: 'with-text', label: 'Com texto' },
            { id: 'no-text', label: 'Sem texto' },
          ]}
          renderCell={(row, col) => {
            const items =
              col.id === 'initial'
                ? GROUP_INITIALS_ITEMS
                : col.id === 'placeholder'
                  ? GROUP_PLACEHOLDER_ITEMS
                  : GROUP_PHOTO_ITEMS
            return (
              <AvatarGroup items={items} label={row.id === 'with-text' ? GROUP_LABEL : undefined} />
            )
          }}
          className={styles.groupsMatrix}
        />

        <CardGrid className={styles.groupGuidelinesGrid}>
          {AVATAR_GROUP_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <CardGrid wide>
          {AVATAR_GUIDELINES.map((g) => (
            <DemoCard key={g.title} title={g.title} description={g.body} />
          ))}
        </CardGrid>
      </Section>
    </div>
  )
}

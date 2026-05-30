import Avatar from '../../components/Avatar/Avatar'
import AvatarGroup from '../../components/AvatarGroup/AvatarGroup'
import { AVATAR_SIZES, AVATAR_VARIANTS, AVATAR_GUIDELINES, AVATAR_GROUP_GUIDELINES } from '../../tokens/avatar'
import type { AvatarSize, AvatarVariant } from '../../tokens/avatar'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
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
      <section className={styles.section}>
        <SectionHeader icon="person" title="Variantes" count={`${AVATAR_VARIANTS.length} variantes`} />
        <div className={styles.variantsGrid}>
          {AVATAR_VARIANTS.map((v) => (
            <div key={v.id} className={styles.variantCard}>
              <div className={styles.variantPreview}>
                <Avatar
                  size="xl"
                  variant={v.id as AvatarVariant}
                  name={DEMO_NAME}
                  src={v.id === 'photo' ? DEMO_SRC_PHOTO : undefined}
                />
              </div>
              <div className={styles.variantBody}>
                <span className={`type-caption-md ${styles.variantLabel}`}>{v.label}</span>
                <p className={`type-body-md ${styles.variantDesc}`}>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Escala de Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader icon="straighten" title="Escala de Tamanhos" count={`${AVATAR_SIZES.length} tamanhos`} />
        <div className={styles.sizesContainer}>
          <div className={styles.sizesHeader}>
            <div className={styles.sizesRowLabel} />
            {AVATAR_VARIANTS.map((v) => (
              <div key={v.id} className={`type-caption-md ${styles.sizesColHeader}`}>{v.label}</div>
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
      </section>

      {/* ── Lógica de Iniciais ── */}
      <section className={styles.section}>
        <SectionHeader icon="abc" title="Lógica de Iniciais" />
        <div className={styles.initialsContainer}>
          <div className={styles.initialsDemo}>
            <div className={styles.initialsExample}>
              <span className={`type-body-md ${styles.initialsName}`}>{DEMO_NAME}</span>
              <span className={`type-caption-md ${styles.initialsArrow}`}>→</span>
              <Avatar size="md" variant="initial" name={DEMO_NAME} />
              <span className={`type-caption-md ${styles.initialsResult}`}>AB</span>
            </div>
            <p className={`type-body-sm ${styles.initialsNote}`}>
              As iniciais são extraídas do primeiro caractere do primeiro nome e do primeiro caractere do último nome. Em tamanho XS, apenas a inicial do primeiro nome é exibida.
            </p>
          </div>
        </div>
      </section>

      {/* ── Avatar Group ── */}
      <section className={styles.section}>
        <SectionHeader icon="group" title="Avatar Group" />
        <p className={`type-body-md ${styles.groupDescription}`}>
          Grupos de avatares são usados para mostrar um conjunto de indivíduos na interface. Suportam três variantes: <strong>Initials</strong>, <strong>Placeholders</strong> e <strong>Photos</strong>.
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

        <div className={`${styles.guidelinesGrid} ${styles.groupGuidelinesGrid}`}>
          {AVATAR_GROUP_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={`type-title-sm ${styles.guidelineTitle}`}>{g.title}</h3>
              <p className={`type-body-md ${styles.guidelineBody}`}>{g.body}</p>
              <div className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {AVATAR_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={`type-title-sm ${styles.guidelineTitle}`}>{g.title}</h3>
              <p className={`type-body-md ${styles.guidelineBody}`}>{g.body}</p>
              <div className={`type-caption-sm ${styles.guidelineRule}`}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import Skeleton from '../../components/Skeleton/Skeleton'
import {
  SKELETON_TYPES,
  SKELETON_BUTTON_SIZES,
  SKELETON_INPUT_SIZES,
  SKELETON_AVATAR_SIZES,
  SKELETON_BODY_SIZES,
  SKELETON_TITLE_SIZES,
  SKELETON_CAPTION_SIZES,
  SKELETON_DISPLAY_SIZES,
  SKELETON_GUIDELINES,
} from '../../tokens/skeleton'
import type { SkeletonSize } from '../../tokens/skeleton'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './SkeletonPage.module.css'

export default function SkeletonPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Indicators"
        title="Skeleton"
        subtitle="Placeholder estrutural que representa a forma e a proporção de conteúdos em carregamento, mantendo o layout estável e evitando movimentos bruscos na interface. Segue a estrutura do componente real, permitindo ao usuário antecipar o tipo de conteúdo que será renderizado."
        stats={[
          { value: 8, label: 'Tipos' },
          { value: 22, label: 'Tamanhos' },
        ]}
      />

      {/* ── Tipos ── */}
      <section className={styles.section}>
        <SectionHeader icon="category" title="Tipos" count={`${SKELETON_TYPES.length} tipos`} />
        <div className={styles.typesGrid}>
          {SKELETON_TYPES.map((t) => (
            <div key={t.id} className={styles.typeCard}>
              <div className={styles.typePreview}>
                {t.id === 'avatar' ? (
                  <Skeleton type="avatar" size="md" />
                ) : t.id === 'input' ? (
                  <Skeleton type="input" size="md" />
                ) : t.id === 'card' ? (
                  <Skeleton type="card" height={80} />
                ) : (
                  <Skeleton type={t.id} size="md" />
                )}
              </div>
              <div className={styles.typeMeta}>
                <span className={styles.typeLabel}>{t.label}</span>
                <p className={styles.typeDesc}>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tamanhos ── */}
      <section className={styles.section}>
        <SectionHeader icon="straighten" title="Tamanhos" count="22 variações" />

        {/* Row 1: Button, Input, Avatar, Body */}
        <div className={styles.sizesGrid}>
          {/* Button */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_BUTTON_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="button" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Button · SM / MD / LG</span>
          </div>

          {/* Input */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_INPUT_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="input" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Input · SM / MD / LG</span>
          </div>

          {/* Avatar */}
          <div className={styles.sizeCard}>
            <div className={[styles.sizePreview, styles.sizePreviewRow].join(' ')}>
              {SKELETON_AVATAR_SIZES.map((s) => (
                <div key={s.id} className={styles.avatarSizeItem}>
                  <Skeleton type="avatar" size={s.id as SkeletonSize} />
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Avatar · XS / SM / MD / LG / XL</span>
          </div>

          {/* Body */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_BODY_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="body" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Body · XS / SM / MD / LG</span>
          </div>
        </div>

        {/* Row 2: Title, Caption, Display, Card */}
        <div className={[styles.sizesGrid, styles.sizesGridSecondRow].join(' ')}>
          {/* Title */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_TITLE_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="title" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Title · SM / MD / LG</span>
          </div>

          {/* Caption */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_CAPTION_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="caption" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Caption · SM / MD / LG</span>
          </div>

          {/* Display */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_DISPLAY_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={styles.sizeRowLabel}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="display" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={styles.sizeCardLabel}>Display · SM / MD / LG / XL / 2XL / 3XL</span>
          </div>

          {/* Card */}
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              <Skeleton type="card" height={80} />
              <Skeleton type="card" height={120} />
              <Skeleton type="card" height={160} />
            </div>
            <span className={styles.sizeCardLabel}>Card · altura livre via prop</span>
          </div>
        </div>
      </section>

      {/* ── Diretrizes ── */}
      <section className={styles.section}>
        <SectionHeader icon="checklist" title="Diretrizes de Uso" />
        <div className={styles.guidelinesGrid}>
          {SKELETON_GUIDELINES.map((g) => (
            <div key={g.title} className={styles.guidelineCard}>
              <h3 className={styles.guidelineTitle}>{g.title}</h3>
              <p className={styles.guidelineBody}>{g.body}</p>
              <div className={styles.guidelineRule}>{g.rule}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

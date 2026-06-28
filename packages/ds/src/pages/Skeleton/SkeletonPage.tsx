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
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
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
      <Section icon="category" title="Tipos" count={SKELETON_TYPES.length}>
        <CardGrid>
          {SKELETON_TYPES.map((t) => (
            <DemoCard
              key={t.id}
              preview={
                t.id === 'avatar' ? (
                  <Skeleton type="avatar" size="md" />
                ) : t.id === 'input' ? (
                  <Skeleton type="input" size="md" />
                ) : t.id === 'card' ? (
                  <Skeleton type="card" height={80} />
                ) : (
                  <Skeleton type={t.id} size="md" />
                )
              }
              title={t.label}
              description={t.description}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Tamanhos ── */}
      <Section icon="straighten" title="Tamanhos" count={22}>
        {/* Row 1: Button, Input, Avatar, Body */}
        <div className={styles.sizesGrid}>
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_BUTTON_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="button" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>Button · SM / MD / LG</span>
          </div>

          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_INPUT_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="input" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>Input · SM / MD / LG</span>
          </div>

          <div className={styles.sizeCard}>
            <div className={[styles.sizePreview, styles.sizePreviewRow].join(' ')}>
              {SKELETON_AVATAR_SIZES.map((s) => (
                <div key={s.id} className={styles.avatarSizeItem}>
                  <Skeleton type="avatar" size={s.id as SkeletonSize} />
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>
              Avatar · XS / SM / MD / LG / XL
            </span>
          </div>

          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_BODY_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="body" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>
              Body · XS / SM / MD / LG
            </span>
          </div>
        </div>

        {/* Row 2: Title, Caption, Display, Card */}
        <div className={[styles.sizesGrid, styles.sizesGridSecondRow].join(' ')}>
          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_TITLE_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="title" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>Title · SM / MD / LG</span>
          </div>

          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_CAPTION_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="caption" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>
              Caption · SM / MD / LG
            </span>
          </div>

          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              {SKELETON_DISPLAY_SIZES.map((s) => (
                <div key={s.id} className={styles.sizeRow}>
                  <span className={`type-caption-sm ${styles.sizeRowLabel}`}>{s.label}</span>
                  <div className={styles.sizeRowBone}>
                    <Skeleton type="display" size={s.id as SkeletonSize} />
                  </div>
                </div>
              ))}
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>
              Display · SM / MD / LG / XL / 2XL / 3XL
            </span>
          </div>

          <div className={styles.sizeCard}>
            <div className={styles.sizePreview}>
              <Skeleton type="card" height={80} />
              <Skeleton type="card" height={120} />
              <Skeleton type="card" height={160} />
            </div>
            <span className={`type-caption-sm ${styles.sizeCardLabel}`}>
              Card · altura livre via prop
            </span>
          </div>
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={SKELETON_GUIDELINES} />
      </Section>
    </div>
  )
}

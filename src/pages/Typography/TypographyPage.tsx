import { FONT_FAMILIES, TYPOGRAPHY_GROUPS } from '../../tokens/typography'
import FontFamilyCard from '../../components/FontFamilyCard/FontFamilyCard'
import TypeSpecimen from '../../components/TypeSpecimen/TypeSpecimen'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import styles from './TypographyPage.module.css'

const totalStyles = TYPOGRAPHY_GROUPS.reduce((acc, g) => acc + g.tokens.length, 0)

const SECTION_ICONS: Record<string, string> = {
  display: 'text_fields',
  title: 'title',
  body: 'article',
  caption: 'short_text',
}

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Foundation"
        title="Typography"
        subtitle="Sistema tipográfico do Globo Ads Design System. Dois typefaces complementares definem a identidade — Globotipo Corporativa para displays expressivos e Inter Variable para toda a interface de produto — garantindo hierarquia, legibilidade e consistência."
        stats={[
          { value: FONT_FAMILIES.length, label: 'Famílias' },
          { value: TYPOGRAPHY_GROUPS.length, label: 'Categorias' },
          { value: totalStyles, label: 'Estilos' },
        ]}
      />

      <section className={styles.section}>
        <SectionHeader icon="font_download" title="Famílias Tipográficas" count={`${FONT_FAMILIES.length} famílias`} />
        <div className={styles.familiesGrid}>
          {FONT_FAMILIES.map((family) => (
            <FontFamilyCard key={family.id} family={family} />
          ))}
        </div>
      </section>

      {TYPOGRAPHY_GROUPS.map((group) => (
        <section key={group.category} className={styles.section}>
          <SectionHeader
            icon={SECTION_ICONS[group.category] ?? 'text_fields'}
            title={group.title}
            count={`${group.tokens.length} estilos`}
          />
          <p className={styles.groupDescription}>{group.description}</p>
          <div className={styles.specimensContainer}>
            {group.tokens.map((token) => (
              <TypeSpecimen key={token.name} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

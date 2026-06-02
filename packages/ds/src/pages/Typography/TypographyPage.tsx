import { FONT_FAMILIES, TYPOGRAPHY_GROUPS } from '../../tokens/typography'
import FontFamilyCard from '../../components/docs/FontFamilyCard/FontFamilyCard'
import TypeSpecimen from '../../components/docs/TypeSpecimen/TypeSpecimen'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
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

      <Section icon="font_download" title="Famílias Tipográficas" count={FONT_FAMILIES.length}>
        <div className={styles.familiesGrid}>
          {FONT_FAMILIES.map((family) => (
            <FontFamilyCard key={family.id} family={family} />
          ))}
        </div>
      </Section>

      {TYPOGRAPHY_GROUPS.map((group) => (
        <Section
          key={group.category}
          icon={SECTION_ICONS[group.category] ?? 'text_fields'}
          title={group.title}
          count={group.tokens.length}
        >
          <p className={`type-body-md ${styles.groupDescription}`}>{group.description}</p>
          <div className={styles.specimensContainer}>
            {group.tokens.map((token) => (
              <TypeSpecimen key={token.name} token={token} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  )
}

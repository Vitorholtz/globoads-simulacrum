import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'

export default function CriativosPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Criativos"
        title="Criativos"
        subtitle="Área temporária para testar composições relacionadas a criativos publicitários."
      />

      <Section icon="ad_units" title="Em construção">
        <p className="type-body-md">Conteúdo em desenvolvimento.</p>
      </Section>
    </div>
  )
}

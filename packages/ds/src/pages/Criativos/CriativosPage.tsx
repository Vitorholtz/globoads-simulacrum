import { useState } from 'react'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import CreativeCard from './CreativeCard'
import CreativeStatusCard from './CreativeStatusCard'
import CreativePreviewCard from './CreativePreviewCard'
import CreativeDrawer from './CreativeDrawer'
import CreativeUpload from './CreativeUpload'
import { CREATIVES, type Creative } from './creatives'
import styles from './CriativosPage.module.css'

export default function CriativosPage() {
  const [openCreative, setOpenCreative] = useState<Creative | null>(null)
  const [creatives, setCreatives] = useState<Creative[]>(CREATIVES)

  return (
    <div>
      <PageHeader
        breadcrumb="Criativos"
        title="Criativos"
        subtitle="Área temporária para testar composições relacionadas a criativos publicitários."
      />

      <Section
        icon="upload"
        title="Upload de criativos"
        description="Envie uma imagem (ou um .zip para formatos compostos como o Touchpoint Imagético): dimensões, peso e extensão são lidos do arquivo e o formato publicitário é identificado automaticamente, gerando um card novo na galeria abaixo."
      >
        <CreativeUpload onCreativeAdded={(c) => setCreatives((prev) => [c, ...prev])} />
      </Section>

      <Section
        icon="ad_units"
        title="Card de criativo"
        description="Card de configuração de um criativo enviado pelo usuário. Clique no header ou no preview para selecionar."
      >
        <div className={styles.gallery}>
          {creatives.map((c, i) => (
            <CreativeCard
              key={c.id}
              name={c.name}
              imageSrc={c.imageSrc}
              format={c.format}
              defaultSelected={i === creatives.length - 1}
              onViewDetails={() => setOpenCreative(c)}
            />
          ))}
        </div>
      </Section>

      <Section
        icon="collections"
        title="Card de galeria"
        description="Card de exibição de criativo na galeria. Mantém a interação de seleção, mas mostra o status e uma tag de categoria opcional no lugar das configurações."
      >
        <div className={styles.gallery}>
          {creatives.map((c, i) => (
            <CreativeStatusCard
              key={c.id}
              name={c.name}
              imageSrc={c.imageSrc}
              format={c.format}
              tag={c.tag}
              status={c.status}
              statusVariant={c.statusVariant}
              defaultSelected={i === creatives.length - 1}
              onViewDetails={() => setOpenCreative(c)}
            />
          ))}
        </div>
      </Section>

      <Section
        icon="preview"
        title="Card de visualização"
        description="Card somente leitura para revisar um envio: exibe as configurações já feitas em campos desabilitados e preenchidos. Não tem checkbox nem estados de seleção — só o botão de opções é interativo."
      >
        <div className={styles.gallery}>
          {creatives.map((c) => (
            <CreativePreviewCard
              key={c.id}
              name={c.name}
              imageSrc={c.imageSrc}
              format={c.format}
              status={c.status}
              statusVariant={c.statusVariant}
              position={c.position}
              onViewDetails={() => setOpenCreative(c)}
            />
          ))}
        </div>
      </Section>

      <CreativeDrawer
        creative={openCreative}
        open={openCreative !== null}
        onClose={() => setOpenCreative(null)}
      />
    </div>
  )
}

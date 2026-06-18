import { useState } from 'react'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import Button from '../../components/Button/Button'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import DemoCard from '../../components/docs/DemoCard/DemoCard'
import CardGrid from '../../components/docs/CardGrid/CardGrid'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import { CONFIRM_DIALOG_GUIDELINES } from '../../tokens/confirmDialog'
import { cx } from '../../utils/cx'
import styles from './ConfirmDialogPage.module.css'

/** Prévia estática do painel — sem portal, para uso em DemoCards. */
function PanelPreview({ description }: { description?: string }) {
  return (
    <div className={styles.panelPreview}>
      <div className={styles.panelHeader}>
        <span className={cx('type-title-md', styles.panelTitle)}>Excluir criativo?</span>
        <span
          className={cx('material-symbols-rounded', 'icon-md', styles.panelClose)}
          aria-hidden="true"
        >
          close
        </span>
      </div>
      {description && <p className={cx('type-body-md', styles.panelDescription)}>{description}</p>}
      <div className={styles.panelActions}>
        <Button type="button" variant="secondary" size="md">
          Cancelar
        </Button>
        <Button type="button" variant="primary" size="md" danger>
          Excluir
        </Button>
      </div>
    </div>
  )
}

export default function ConfirmDialogPage() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <PageHeader
        breadcrumb="Overlays"
        title="Confirm Dialog"
        subtitle="Confirm Dialog é um overlay centralizado de confirmação explícita. Interrompe o fluxo para que o usuário valide conscientemente uma ação — especialmente as destrutivas e irreversíveis."
        stats={[
          { value: 1, label: 'Variante' },
          { value: 2, label: 'Combinações de conteúdo' },
          { value: 4, label: 'Diretrizes' },
        ]}
      />

      {/* ── Componente ── */}
      <Section icon="warning" title="Componente">
        <div className={styles.demoArea}>
          <p className={cx('type-body-sm', styles.demoHint)}>
            Clique no botão para abrir o Confirm Dialog e interagir com o componente real.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="md"
            danger
            iconLeft="delete"
            onClick={() => setOpen(true)}
          >
            Excluir criativo
          </Button>
        </div>
        <ConfirmDialog
          open={open}
          title="Excluir criativo?"
          description='"Banner_Principal.jpg" será removido da galeria permanentemente.'
          confirmLabel="Excluir"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </Section>

      {/* ── Combinações de conteúdo ── */}
      <Section
        icon="notes"
        title="Conteúdo"
        count={2}
        description="O Confirm Dialog suporta duas combinações de conteúdo. A descrição é opcional, mas recomendada para ações destrutivas."
      >
        <CardGrid cols={2}>
          <DemoCard
            preview={
              <PanelPreview description='"Banner_Principal.jpg" será removido da galeria permanentemente.' />
            }
            title="Título e descrição"
            description="Configuração recomendada para ações destrutivas. A descrição especifica o objeto afetado ou as consequências da ação, reduzindo erros por confirmação impensada."
          />
          <DemoCard
            preview={<PanelPreview />}
            title="Apenas título"
            description="Use quando a ação é suficientemente clara pelo título e pelo contexto em que foi acionada — ex: confirmação a partir de um botão já rotulado no item afetado."
          />
        </CardGrid>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={CONFIRM_DIALOG_GUIDELINES} />
      </Section>
    </div>
  )
}

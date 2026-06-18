import { useState, type ReactNode } from 'react'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import GuidelinesGrid from '../../components/docs/GuidelinesGrid/GuidelinesGrid'
import DocTable from '../../components/docs/DocTable/DocTable'
import Button from '../../components/Button/Button'
import Switch from '../../components/Switch/Switch'
import CreativeCard, { type CreativeCardMode } from '../../components/CreativeCard/CreativeCard'
import CreativeStatusBadge from '../../components/CreativeCard/CreativeStatusBadge'
import CreativeDrawer from '../../components/CreativeCard/CreativeDrawer'
import type { Creative, CreativeFieldsConfig } from '../../components/CreativeCard/types'
import {
  CREATIVE_CARD_MODES,
  CREATIVE_CARD_STATES,
  CREATIVE_CARD_GUIDELINES,
} from '../../tokens/creativeCard'
import { cx } from '../../utils/cx'
import { SAMPLE_CREATIVES } from './creativeFixtures'
import styles from './CreativeCardPage.module.css'

const [APPROVED, ANALYZING, REJECTED, CONFIGURING] = SAMPLE_CREATIVES

const MODE_SAMPLE: Record<CreativeCardMode, Creative> = {
  config: CONFIGURING,
  review: ANALYZING,
  gallery: APPROVED,
}

const COMPOSITION_GROUPS = [
  { label: 'Header', items: ['Checkbox', 'OptionsMenu'] },
  { label: 'Preview', items: ['StaticThumb', 'Badge'] },
  { label: 'Corpo', items: ['DateTimePicker', 'TextField', 'Select'] },
  { label: 'Status', items: ['CreativeStatusBadge'] },
  { label: 'Drawer', items: ['Tabs', 'InfoPanel', 'InteractiveThumb'] },
]

const FIELDS_TOGGLES: Array<{ key: keyof CreativeFieldsConfig; label: string }> = [
  { key: 'period', label: 'Período de veiculação' },
  { key: 'url', label: 'URL de destino' },
  { key: 'pixel', label: 'Pixel' },
  { key: 'position', label: 'Posição' },
]

const PROP_ROWS: Array<{ prop: string; type: string; default: string; desc: string }> = [
  {
    prop: 'creative',
    type: 'Creative',
    default: '—',
    desc: 'Criativo exibido. O status do badge é derivado de creative.state.',
  },
  {
    prop: 'mode',
    type: "'config' | 'review' | 'gallery'",
    default: "'config'",
    desc: 'Composição do corpo: editável, somente leitura ou galeria.',
  },
  {
    prop: 'fields',
    type: 'CreativeFieldsConfig',
    default: '—',
    desc: 'Blocos habilitados (period / url / pixel / position). Omitido = todos visíveis.',
  },
  {
    prop: 'selected',
    type: 'boolean',
    default: '—',
    desc: 'Seleção controlada. Ausente → card gerencia o próprio estado.',
  },
  {
    prop: 'defaultSelected',
    type: 'boolean',
    default: 'false',
    desc: 'Seleção inicial (não controlado).',
  },
  {
    prop: 'onSelectedChange',
    type: '(selected: boolean) => void',
    default: '—',
    desc: 'Notifica mudança de seleção.',
  },
  {
    prop: 'positionOptions',
    type: 'SelectOption[]',
    default: 'DEFAULT_POSITION_OPTIONS',
    desc: 'Opções do campo "Posição".',
  },
  {
    prop: 'onViewDetails',
    type: '() => void',
    default: '—',
    desc: 'Abre os detalhes (menu de opções / status).',
  },
  {
    prop: 'onStatusLink',
    type: '() => void',
    default: '—',
    desc: 'Ação do link de status (rejected → "Ver detalhes").',
  },
  {
    prop: 'onDownload',
    type: '() => void',
    default: '—',
    desc: 'Inicia o download do arquivo do criativo (item "Baixar" do menu).',
  },
  {
    prop: 'onDelete',
    type: '() => void',
    default: '—',
    desc: 'Solicita a exclusão do criativo. A confirmação é responsabilidade do consumidor.',
  },
  {
    prop: 'onFieldChange',
    type: '(patch: Partial<Creative>) => void',
    default: '—',
    desc: 'Notifica alteração de um campo de configuração. Só disparado em mode="config".',
  },
  {
    prop: 'className',
    type: 'string',
    default: '—',
    desc: 'Classe CSS adicional aplicada à raiz do card.',
  },
]

export default function CreativeCardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [demoFields, setDemoFields] = useState<CreativeFieldsConfig>({
    period: true,
    url: true,
    pixel: true,
    position: true,
  })
  const [showTag, setShowTag] = useState(true)

  return (
    <div>
      <PageHeader
        breadcrumb="Business Components"
        title="Creative Card"
        subtitle="Card de um criativo publicitário ao longo do ciclo de vida de validação. Compõe primitivos do DS num único componente com três modos (config, review, gallery) e status derivado do estado. É um Business Component: carrega regra de negócio e orquestra vários primitivos."
        stats={[
          { value: CREATIVE_CARD_MODES.length, label: 'Modos' },
          { value: CREATIVE_CARD_STATES.length, label: 'Estados' },
        ]}
      />

      {/* ── Modos ── */}
      <Section
        icon="view_agenda"
        title="Modos"
        count={CREATIVE_CARD_MODES.length}
        description="Header e preview são compartilhados entre os três modos; só o corpo varia por mode."
      >
        <div className={styles.modeGrid}>
          {CREATIVE_CARD_MODES.map((m) => (
            <div key={m.id} className={styles.modeCard}>
              <div className={styles.modePreview}>
                <CreativeCard mode={m.id} creative={MODE_SAMPLE[m.id]} />
              </div>
              <div className={styles.modeBody}>
                <div className={styles.modeTitleRow}>
                  <h3 className={`type-title-sm ${styles.modeName}`}>{m.label}</h3>
                  <span className={`type-caption-sm ${styles.modeTagline}`}>{m.tagline}</span>
                </div>
                <p className={`type-body-md ${styles.modeDesc}`}>{m.description}</p>
                <ul className={styles.modeWhen}>
                  {m.when.map((item) => (
                    <li key={item} className="type-body-md">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Campos configuráveis ── */}
      <Section
        icon="tune"
        title="Campos configuráveis"
        description="Habilite ou desabilite cada bloco via prop fields. Os mesmos campos habilitados aparecem no modo config (editável), review (somente leitura) e no drawer de detalhes."
      >
        <div className={styles.fieldsDemoStack}>
          <div className={styles.fieldsDemo}>
            <div className={styles.fieldsToggleGroup}>
              {FIELDS_TOGGLES.map(({ key, label }) => (
                <Switch
                  key={key}
                  label={label}
                  checked={demoFields[key] ?? true}
                  onChange={(v) => setDemoFields((f) => ({ ...f, [key]: v }))}
                />
              ))}
            </div>
            <div className={styles.fieldsDemoPreview}>
              <div className={styles.fieldsDemoCard}>
                <CreativeCard mode="config" creative={CONFIGURING} fields={demoFields} />
              </div>
              <div className={styles.fieldsDemoCard}>
                <CreativeCard mode="review" creative={ANALYZING} fields={demoFields} />
              </div>
            </div>
          </div>

          <div className={styles.fieldsDemo}>
            <div className={styles.fieldsToggleGroup}>
              <Switch label="Tag" checked={showTag} onChange={setShowTag} />
            </div>
            <div className={styles.fieldsDemoPreview}>
              <div className={styles.fieldsDemoCard}>
                <CreativeCard
                  mode="gallery"
                  creative={showTag ? APPROVED : { ...APPROVED, tag: undefined }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Estados ── */}
      <Section
        icon="timeline"
        title="Estados do ciclo de vida"
        count={CREATIVE_CARD_STATES.length}
        description="O badge é derivado de creative.state — fonte única em creativeLifecycle. Nunca passe o texto do status à mão."
      >
        <div className={styles.stateList}>
          {CREATIVE_CARD_STATES.map((s) => (
            <div key={s.id} className={styles.stateRow}>
              <div className={styles.statePreview}>
                <CreativeStatusBadge state={s.id} />
              </div>
              <div className={styles.stateMeta}>
                <span className={cx('type-caption-md', styles.stateCode)}>{code(`"${s.id}"`)}</span>
                <span className={cx('type-body-sm', styles.stateDesc)}>{s.description}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Drawer de detalhes ── */}
      <Section
        icon="dock_to_left"
        title="Drawer de detalhes"
        description="Ver detalhes abre um drawer lateral com as abas Detalhes (preview + metadados do criativo) e Etapas de validação (linha do tempo)."
      >
        <Button
          type="button"
          variant="secondary"
          size="md"
          iconLeft="dock_to_left"
          onClick={() => setDrawerOpen(true)}
        >
          Abrir drawer de exemplo
        </Button>
        <CreativeDrawer
          creative={REJECTED}
          open={drawerOpen}
          initialTab="validacao"
          onClose={() => setDrawerOpen(false)}
        />
      </Section>

      {/* ── Composição ── */}
      <Section
        icon="widgets"
        title="Composição"
        description="O CreativeCard não reimplementa nada: orquestra primitivos do DS em cada região do layout."
      >
        <div className={styles.compositionGroups}>
          {COMPOSITION_GROUPS.map((g) => (
            <div key={g.label} className={styles.compositionGroup}>
              <span className={cx('type-caption-sm', styles.compositionGroupLabel)}>{g.label}</span>
              <div className={styles.compositionChips}>
                {g.items.map((name) => (
                  <span key={name} className={cx('type-caption-md', styles.chip)}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Diretrizes ── */}
      <Section icon="checklist" title="Diretrizes de Uso">
        <GuidelinesGrid items={CREATIVE_CARD_GUIDELINES} />
      </Section>

      {/* ── Propriedades ── */}
      <Section
        icon="data_object"
        title="Propriedades"
        description="API do componente. O status nunca é passado à mão — vem de creative.state."
      >
        <DocTable
          columns={[
            { key: 'prop', label: 'Prop', width: '18%' },
            { key: 'type', label: 'Tipo', width: '30%' },
            { key: 'default', label: 'Default', width: '18%' },
            { key: 'desc', label: 'Descrição' },
          ]}
          rows={PROP_ROWS.map((r) => ({
            prop: code(r.prop),
            type: code(r.type),
            default: r.default === '—' ? r.default : code(r.default),
            desc: r.desc,
          }))}
        />
      </Section>
    </div>
  )
}

function code(text: string): ReactNode {
  return <code className={styles.code}>{text}</code>
}

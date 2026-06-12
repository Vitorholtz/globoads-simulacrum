import { useState, useRef, useCallback } from 'react'
import PageHeader from '../../components/docs/PageHeader/PageHeader'
import Section from '../../components/docs/Section/Section'
import TextField from '../../components/TextField/TextField'
import Select from '../../components/Select/Select'
import Textarea from '../../components/Textarea/Textarea'
import DatePicker from '../../components/DatePicker/DatePicker'
import Button from '../../components/Button/Button'
import Toast from '../../components/Toast/Toast'
import styles from './FormulariosPage.module.css'
import type { SelectOption } from '../../components/Select/Select'

const ESTADOS: SelectOption[] = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

const AREAS: SelectOption[] = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'comercial', label: 'Comercial / Vendas' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'rh', label: 'Recursos Humanos' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'operacoes', label: 'Operações' },
  { value: 'juridico', label: 'Jurídico' },
  { value: 'design', label: 'Design' },
]

const EXIT_MS = 250

interface FormFields {
  nomeCompleto: string
  email: string
  telefone: string
  cpf: string
  nascimento: Date | null
  cep: string
  estado: string
  cidade: string
  bairro: string
  logradouro: string
  complemento: string
  empresa: string
  cargo: string
  area: string
  sobre: string
}

const EMPTY: FormFields = {
  nomeCompleto: '',
  email: '',
  telefone: '',
  cpf: '',
  nascimento: null,
  cep: '',
  estado: '',
  cidade: '',
  bairro: '',
  logradouro: '',
  complemento: '',
  empresa: '',
  cargo: '',
  area: '',
  sobre: '',
}

export default function FormulariosPage() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startExit = useCallback(() => {
    setLeaving(true)
    leaveTimerRef.current = setTimeout(() => {
      setToastVisible(false)
      setLeaving(false)
    }, EXIT_MS)
  }, [])

  function setStr(key: keyof FormFields) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }) as FormFields)
  }

  function setTextarea(key: keyof FormFields) {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }) as FormFields)
  }

  function setSel(key: keyof FormFields) {
    return (val: string) => setFields((prev) => ({ ...prev, [key]: val }) as FormFields)
  }

  const isComplete = Boolean(
    fields.nomeCompleto &&
    fields.email &&
    fields.telefone &&
    fields.cpf &&
    fields.nascimento &&
    fields.cep &&
    fields.estado &&
    fields.cidade &&
    fields.bairro &&
    fields.logradouro &&
    fields.empresa &&
    fields.cargo &&
    fields.area
  )

  function err(val: string | Date | null) {
    return submitted && !val ? 'Campo obrigatório' : undefined
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (!isComplete) return
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    setLeaving(false)
    setToastVisible(true)
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Formulários"
        title="Formulários"
        subtitle="Área temporária para testar composições de formulários com os componentes do Design System."
      />

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Section icon="person" title="Dados pessoais">
            <div className={styles.fieldGrid}>
              <TextField
                className={styles.fieldFull}
                label="Nome completo"
                leadingIcon="person"
                placeholder="Ex.: João Silva"
                value={fields.nomeCompleto}
                onChange={setStr('nomeCompleto')}
                errorMessage={err(fields.nomeCompleto)}
              />
              <TextField
                label="E-mail"
                leadingIcon="mail"
                placeholder="Ex.: joao@email.com"
                value={fields.email}
                onChange={setStr('email')}
                errorMessage={err(fields.email)}
              />
              <TextField
                label="Telefone"
                leadingIcon="phone"
                placeholder="(00) 00000-0000"
                mask="phone"
                value={fields.telefone}
                onChange={setStr('telefone')}
                errorMessage={err(fields.telefone)}
              />
              <TextField
                label="CPF"
                placeholder="000.000.000-00"
                mask="cpf"
                value={fields.cpf}
                onChange={setStr('cpf')}
                errorMessage={err(fields.cpf)}
              />
              <DatePicker
                label="Data de nascimento"
                value={fields.nascimento}
                onChange={(date) => setFields((prev) => ({ ...prev, nascimento: date }))}
                errorMessage={err(fields.nascimento)}
              />
            </div>
          </Section>

          <Section icon="location_on" title="Endereço">
            <div className={styles.fieldGrid}>
              <TextField
                label="CEP"
                leadingIcon="location_on"
                placeholder="00000-000"
                mask="cep"
                value={fields.cep}
                onChange={setStr('cep')}
                errorMessage={err(fields.cep)}
              />
              <Select
                label="Estado"
                placeholder="Selecione"
                options={ESTADOS}
                value={fields.estado}
                onChange={setSel('estado')}
                errorMessage={err(fields.estado)}
              />
              <TextField
                label="Cidade"
                placeholder="Ex.: São Paulo"
                value={fields.cidade}
                onChange={setStr('cidade')}
                errorMessage={err(fields.cidade)}
              />
              <TextField
                label="Bairro"
                placeholder="Ex.: Centro"
                value={fields.bairro}
                onChange={setStr('bairro')}
                errorMessage={err(fields.bairro)}
              />
              <TextField
                className={styles.fieldFull}
                label="Logradouro"
                placeholder="Ex.: Rua das Flores, 123"
                value={fields.logradouro}
                onChange={setStr('logradouro')}
                errorMessage={err(fields.logradouro)}
              />
              <TextField
                className={styles.fieldFull}
                label="Complemento"
                optional
                placeholder="Ex.: Apto 42, Bloco B"
                value={fields.complemento}
                onChange={setStr('complemento')}
              />
            </div>
          </Section>

          <Section icon="work" title="Perfil profissional">
            <div className={styles.fieldGrid}>
              <TextField
                label="Empresa"
                leadingIcon="business"
                placeholder="Ex.: Globo"
                value={fields.empresa}
                onChange={setStr('empresa')}
                errorMessage={err(fields.empresa)}
              />
              <TextField
                label="Cargo"
                leadingIcon="badge"
                placeholder="Ex.: Product Designer"
                value={fields.cargo}
                onChange={setStr('cargo')}
                errorMessage={err(fields.cargo)}
              />
              <Select
                className={styles.fieldFull}
                label="Área de atuação"
                placeholder="Selecione"
                options={AREAS}
                value={fields.area}
                onChange={setSel('area')}
                errorMessage={err(fields.area)}
              />
              <Textarea
                className={styles.fieldFull}
                label="Sobre você"
                optional
                placeholder="Fale um pouco sobre sua experiência e interesses..."
                maxLength={300}
                showCounter
                value={fields.sobre}
                onChange={setTextarea('sobre')}
              />
            </div>
          </Section>

          <div className={styles.formFooter}>
            <Button type="submit" variant="primary">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>

      {toastVisible && (
        <div className={[styles.toastArea, leaving && styles.leaving].filter(Boolean).join(' ')}>
          <Toast
            type="success"
            title="Cadastro realizado com sucesso!"
            description="Seus dados foram registrados. Bem-vindo(a)."
            onClose={startExit}
          />
        </div>
      )}
    </div>
  )
}

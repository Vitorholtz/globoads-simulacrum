import PageHeader from '../../components/docs/PageHeader/PageHeader'
import CreativeFlowSimulation from './CreativeFlowSimulation'

export default function CreativeFlowSimulationPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Business Components / Creative Card"
        title="Simulação de Fluxo"
        subtitle="Documentação viva: dirija o ciclo de vida e veja os três cenários reagirem em tempo real à mesma fonte de estado. Os controles (enviar, aprovar, reprovar) são de simulação — não fazem parte do componente."
      />
      <CreativeFlowSimulation />
    </div>
  )
}

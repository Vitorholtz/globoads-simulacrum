export type SolidToken = {
  type: 'solid'
  value: string
}

export type GradientToken = {
  type: 'gradient'
  stops: [string, string]
}

export type ColorToken = (SolidToken | GradientToken) & {
  name: string
  variable: string
  description: string
}

export type ColorGroup = {
  label: string
  description?: string
  tokens: ColorToken[]
}

export const COLOR_GROUPS: ColorGroup[] = [
  {
    label: 'Fill',
    description:
      'Tokens de preenchimento para textos, ícones e elementos de interface. Use a hierarquia Primary → Secondary → Tertiary para criar profundidade visual.',
    tokens: [
      {
        type: 'solid',
        value: '#252527',
        name: 'Fill Primary',
        variable: '--color-fill-primary',
        description:
          'Cor principal de conteúdo. Utilizada em textos, ícones e componentes que exigem maior contraste.',
      },
      {
        type: 'solid',
        value: '#4D4E51',
        name: 'Fill Secondary',
        variable: '--color-fill-secondary',
        description:
          'Cor secundária de conteúdo. Indicada para informações complementares de menor hierarquia visual.',
      },
      {
        type: 'solid',
        value: '#939598',
        name: 'Fill Tertiary',
        variable: '--color-fill-tertiary',
        description:
          'Cor terciária de conteúdo. Utilizada para textos auxiliares e estados menos enfatizados.',
      },
      {
        type: 'solid',
        value: '#FFFFFF',
        name: 'Fill Inverse',
        variable: '--color-fill-inverse',
        description:
          'Cor de preenchimento inversa. Utilizada em textos, ícones e elementos sobre superfícies escuras ou fundos de alto contraste.',
      },
      {
        type: 'solid',
        value: '#185CFB',
        name: 'Fill Accent',
        variable: '--color-fill-accent',
        description:
          'Cor de destaque para ações principais: botões primários, links e elementos interativos.',
      },
      {
        type: 'gradient',
        stops: ['#185CFB', '#8800F8'],
        name: 'Fill Accent Gradient',
        variable: '--color-fill-accent-gradient',
        description:
          'Versão em gradiente da cor de destaque, para elementos com maior protagonismo visual.',
      },
      {
        type: 'solid',
        value: '#008321',
        name: 'Fill Success',
        variable: '--color-fill-success',
        description: 'Indica sucesso, confirmação ou estados positivos.',
      },
      {
        type: 'solid',
        value: '#88630B',
        name: 'Fill Warning',
        variable: '--color-fill-warning',
        description: 'Representa alertas, atenção ou avisos importantes.',
      },
      {
        type: 'solid',
        value: '#B70634',
        name: 'Fill Critical',
        variable: '--color-fill-critical',
        description: 'Indica ações destrutivas, erros ou estados críticos.',
      },
    ],
  },
  {
    label: 'Surface',
    description:
      'Tokens de fundo para cards, painéis e áreas recuadas. Primary é o fundo padrão de card; Secondary é a área de preview; Tertiary é o fundo mais escuro da hierarquia.',
    tokens: [
      {
        type: 'solid',
        value: '#FFFFFF',
        name: 'Surface Primary',
        variable: '--color-surface-primary',
        description: 'Cor principal de superfície. Base para áreas de conteúdo e componentes.',
      },
      {
        type: 'solid',
        value: '#F7F7F7',
        name: 'Surface Secondary',
        variable: '--color-surface-secondary',
        description:
          'Cor secundária de superfície. Cria diferenciação sutil entre áreas e agrupamentos.',
      },
      {
        type: 'solid',
        value: '#F2F2F2',
        name: 'Surface Tertiary',
        variable: '--color-surface-tertiary',
        description:
          'Cor terciária de superfície. Reforça níveis adicionais de profundidade ou separação.',
      },
      {
        type: 'solid',
        value: '#E6F7FF',
        name: 'Surface Accent',
        variable: '--color-surface-accent',
        description:
          'Superfície auxiliar da cor de destaque. Destaca áreas relacionadas a ações importantes.',
      },
      {
        type: 'solid',
        value: '#EDFDE7',
        name: 'Surface Success',
        variable: '--color-surface-success',
        description: 'Superfície auxiliar em contextos de sucesso e feedback positivo.',
      },
      {
        type: 'solid',
        value: '#FEFBE1',
        name: 'Surface Warning',
        variable: '--color-surface-warning',
        description: 'Superfície auxiliar para estados de aviso ou atenção.',
      },
      {
        type: 'solid',
        value: '#FFEDE5',
        name: 'Surface Critical',
        variable: '--color-surface-critical',
        description: 'Superfície auxiliar para estados críticos ou mensagens de erro.',
      },
      {
        type: 'solid',
        value: 'transparent',
        name: 'Surface Ghost',
        variable: '--color-surface-ghost',
        description:
          'Superfície transparente. Utilizada em elementos e componentes sem fundo definido, permitindo que o conteúdo subjacente apareça.',
      },
    ],
  },
  {
    label: 'Border',
    description:
      'Tokens para bordas, separadores e divisores. Primary é a borda mais visível; Tertiary é a borda mais suave para separadores internos de componentes.',
    tokens: [
      {
        type: 'solid',
        value: '#C7C8CA',
        name: 'Border Primary',
        variable: '--color-border-primary',
        description:
          'Cor principal de borda. Utilizada em cards, campos, chips e demais delimitações visuais.',
      },
      {
        type: 'solid',
        value: '#939598',
        name: 'Border Secondary',
        variable: '--color-border-secondary',
        description:
          'Cor secundária de borda. Indicada para estados com maior contraste ou reforço visual.',
      },
      {
        type: 'solid',
        value: '#00000014',
        name: 'Border Tertiary',
        variable: '--color-border-tertiary',
        description:
          'Cor terciária de borda. Utilizada para separações sutis e menor evidência visual.',
      },
      {
        type: 'solid',
        value: '#65BDFE',
        name: 'Border Accent',
        variable: '--color-border-accent',
        description:
          'Cor de borda auxiliar para elementos de destaque e componentes de ações principais.',
      },
      {
        type: 'solid',
        value: '#185cfbcc',
        name: 'Border Accent Strong',
        variable: '--color-border-accent-strong',
        description:
          'Variante com maior opacidade do accent. Usada em bordas de itens selecionados em dropdowns e listboxes.',
      },
      {
        type: 'gradient',
        stops: ['#185CFB', '#8800F8'],
        name: 'Border Accent Gradient',
        variable: '--color-border-accent-gradient',
        description:
          'Versão em gradiente aplicada em bordas de elementos com maior destaque visual.',
      },
      {
        type: 'solid',
        value: '#6CE95D',
        name: 'Border Success',
        variable: '--color-border-success',
        description: 'Cor de borda auxiliar para indicar sucesso e estados positivos.',
      },
      {
        type: 'solid',
        value: '#FFE543',
        name: 'Border Warning',
        variable: '--color-border-warning',
        description: 'Cor de borda auxiliar para indicar avisos e estados de atenção.',
      },
      {
        type: 'solid',
        value: '#FF7C6D',
        name: 'Border Critical',
        variable: '--color-border-critical',
        description: 'Cor de borda auxiliar para estados críticos, erros ou ações destrutivas.',
      },
      {
        type: 'solid',
        value: '#185cfbcc',
        name: 'Focus Default',
        variable: '--color-focus-default',
        description: 'Cor padrão do indicador de foco para componentes interativos.',
      },
    ],
  },
  {
    label: 'Cores de Ação',
    description:
      'Cores semânticas para estados e feedbacks: sucesso, aviso, crítico e destaque. Use o grupo fill para texto/ícone, surface para fundo e border para borda do componente.',
    tokens: [
      // Solid
      {
        type: 'solid',
        value: '#0050D1',
        name: 'Solid fill Hover',
        variable: '--color-action-solid-fill-hover',
        description:
          'Fundo sólido no estado de hover para elementos com cor de destaque primária. Aplicado em botões primários e controles interativos ao receber o cursor.',
      },
      {
        type: 'solid',
        value: '#0045B6',
        name: 'Solid fill Active',
        variable: '--color-action-solid-fill-active',
        description:
          'Fundo sólido no estado de pressionamento (active) para elementos com cor de destaque primária. Indica a confirmação da ação pelo usuário.',
      },
      {
        type: 'solid',
        value: '#005DD91F',
        name: 'Solid ghost Hover',
        variable: '--color-action-solid-ghost-hover',
        description:
          'Fundo ghost no estado de hover para ações secundárias e controles de menor hierarquia. Mantém transparência parcial para não competir com a superfície subjacente.',
      },
      {
        type: 'solid',
        value: '#005DD933',
        name: 'Solid ghost Active',
        variable: '--color-action-solid-ghost-active',
        description:
          'Fundo ghost no estado de pressionamento para ações secundárias. Opacidade ligeiramente maior que o hover para reforçar o feedback visual de clique.',
      },
      // Gradient
      {
        type: 'gradient',
        stops: ['#0050D1', '#7000D4'],
        name: 'Grad fill Hover',
        variable: '--color-action-grad-fill-hover',
        description:
          'Gradiente de destaque escurecido para o estado de hover. Mantém a identidade visual do gradiente principal com maior profundidade ao receber o cursor.',
      },
      {
        type: 'gradient',
        stops: ['#0045B6', '#5D00B3'],
        name: 'Grad fill Active',
        variable: '--color-action-grad-fill-active',
        description:
          'Gradiente de destaque em seu tom mais escuro para o estado de pressionamento. Fornece contraste adicional no momento da ação confirmada pelo usuário.',
      },
      // Critical
      {
        type: 'solid',
        value: '#930336',
        name: 'Critical fill Hover',
        variable: '--color-action-critical-fill-hover',
        description:
          'Fundo sólido crítico no estado de hover. Aplicado em botões e ações destrutivas ao receber o cursor, reforçando o caráter de alerta.',
      },
      {
        type: 'solid',
        value: '#7A0237',
        name: 'Critical fill Active',
        variable: '--color-action-critical-fill-active',
        description:
          'Fundo sólido crítico no estado de pressionamento. Tom mais profundo que o hover crítico para confirmar visualmente a intenção do usuário em ações destrutivas.',
      },
      {
        type: 'solid',
        value: '#B706341F',
        name: 'Critical ghost Hover',
        variable: '--color-action-critical-ghost-hover',
        description:
          'Fundo ghost crítico no estado de hover. Sinaliza interatividade em controles sensíveis sem ocupar toda a área com cor de alerta.',
      },
      {
        type: 'solid',
        value: '#B7063433',
        name: 'Critical ghost Active',
        variable: '--color-action-critical-ghost-active',
        description:
          'Fundo ghost crítico no estado de pressionamento. Opacidade ligeiramente maior que o hover para reforçar o feedback de confirmação em ações destrutivas.',
      },
    ],
  },
  {
    label: 'Cores de Luminosidade',
    description:
      'Overlays alfa para criar camadas de escurecimento e clareamento sobre fundos. Usados em tooltips, menus e superfícies sobrepostas.',
    tokens: [
      {
        type: 'solid',
        value: '#0000000A',
        name: 'Dark ghost Subtle',
        variable: '--color-luminosity-dark-ghost-subtle',
        description:
          'Sobreposição preta muito sutil para hover de itens de lista e estados selecionados. Mantém a superfície quase intacta enquanto sinaliza interatividade.',
      },
      {
        type: 'solid',
        value: '#00000012',
        name: 'Dark ghost Hover',
        variable: '--color-luminosity-dark-ghost-hover',
        description:
          'Sobreposição preta leve para hover de botões ícone em superfície clara. Aplicado em clearBtn de campos de texto e controles similares.',
      },
      {
        type: 'solid',
        value: '#0000001F',
        name: 'Dark ghost Active',
        variable: '--color-luminosity-dark-ghost-active',
        description:
          'Sobreposição preta média para o estado de pressionamento de botões ícone em superfície clara. Opacidade maior que o hover para reforçar o feedback de clique.',
      },
      {
        type: 'solid',
        value: '#00000066',
        name: 'Dark Backdrop',
        variable: '--color-luminosity-dark-backdrop',
        description:
          'Sobreposição escura para fundos de modais, dialogs e popovers. Cria separação visual total entre o overlay e o conteúdo abaixo.',
      },
      {
        type: 'solid',
        value: '#FFFFFF2E',
        name: 'Light ghost Hover',
        variable: '--color-luminosity-light-ghost-hover',
        description:
          'Sobreposição branca leve para hover de botões ícone sobre superfícies escuras ou coloridas. Aplicado em closeBtn do Toast e controles em fundos de alta saturação.',
      },
      {
        type: 'solid',
        value: '#FFFFFF4D',
        name: 'Light ghost Active',
        variable: '--color-luminosity-light-ghost-active',
        description:
          'Sobreposição branca média para o estado de pressionamento sobre superfícies escuras. Opacidade maior que o hover para indicar a confirmação da ação.',
      },
      {
        type: 'solid',
        value: '#FFFFFF8C',
        name: 'Light ghost Focus',
        variable: '--color-luminosity-light-ghost-focus',
        description:
          'Sobreposição branca para o anel de foco de elementos em superfície escura. Garante visibilidade do indicador de acessibilidade sem depender da cor de foco padrão.',
      },
    ],
  },
]

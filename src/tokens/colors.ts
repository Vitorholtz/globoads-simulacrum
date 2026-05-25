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
  tokens: ColorToken[]
}

export const COLOR_GROUPS: ColorGroup[] = [
  {
    label: 'Fill',
    tokens: [
      {
        type: 'solid',
        value: '#252527',
        name: 'Fill Primary',
        variable: '--color-fill-primary',
        description: 'Cor principal de conteúdo. Utilizada em textos, ícones e componentes que exigem maior contraste.',
      },
      {
        type: 'solid',
        value: '#4D4E51',
        name: 'Fill Secondary',
        variable: '--color-fill-secondary',
        description: 'Cor secundária de conteúdo. Indicada para informações complementares de menor hierarquia visual.',
      },
      {
        type: 'solid',
        value: '#939598',
        name: 'Fill Tertiary',
        variable: '--color-fill-tertiary',
        description: 'Cor terciária de conteúdo. Utilizada para textos auxiliares e estados menos enfatizados.',
      },
      {
        type: 'solid',
        value: '#FFFFFF',
        name: 'Fill Inverse',
        variable: '--color-fill-inverse',
        description: 'Cor de preenchimento inversa. Utilizada em textos, ícones e elementos sobre superfícies escuras ou fundos de alto contraste.',
      },
      {
        type: 'solid',
        value: '#185CFB',
        name: 'Fill Accent',
        variable: '--color-fill-accent',
        description: 'Cor de destaque para ações principais: botões primários, links e elementos interativos.',
      },
      {
        type: 'gradient',
        stops: ['#185CFB', '#8800F8'],
        name: 'Fill Accent Gradient',
        variable: '--color-fill-accent-gradient',
        description: 'Versão em gradiente da cor de destaque, para elementos com maior protagonismo visual.',
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
        description: 'Cor secundária de superfície. Cria diferenciação sutil entre áreas e agrupamentos.',
      },
      {
        type: 'solid',
        value: '#F2F2F2',
        name: 'Surface Tertiary',
        variable: '--color-surface-tertiary',
        description: 'Cor terciária de superfície. Reforça níveis adicionais de profundidade ou separação.',
      },
      {
        type: 'solid',
        value: '#E6F7FF',
        name: 'Surface Accent',
        variable: '--color-surface-accent',
        description: 'Superfície auxiliar da cor de destaque. Destaca áreas relacionadas a ações importantes.',
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
    ],
  },
  {
    label: 'Border',
    tokens: [
      {
        type: 'solid',
        value: '#C7C8CA',
        name: 'Border Primary',
        variable: '--color-border-primary',
        description: 'Cor principal de borda. Utilizada em cards, campos, chips e demais delimitações visuais.',
      },
      {
        type: 'solid',
        value: '#939598',
        name: 'Border Secondary',
        variable: '--color-border-secondary',
        description: 'Cor secundária de borda. Indicada para estados com maior contraste ou reforço visual.',
      },
      {
        type: 'solid',
        value: '#EBEBEB',
        name: 'Border Tertiary',
        variable: '--color-border-tertiary',
        description: 'Cor terciária de borda. Utilizada para separações sutis e menor evidência visual.',
      },
      {
        type: 'solid',
        value: '#65BDFE',
        name: 'Border Accent',
        variable: '--color-border-accent',
        description: 'Cor de borda auxiliar para elementos de destaque e componentes de ações principais.',
      },
      {
        type: 'gradient',
        stops: ['#185CFB', '#8800F8'],
        name: 'Border Accent Gradient',
        variable: '--color-border-accent-gradient',
        description: 'Versão em gradiente aplicada em bordas de elementos com maior destaque visual.',
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
    ],
  },
]

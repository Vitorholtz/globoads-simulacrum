export type TypographyCategory = 'display' | 'title' | 'body' | 'caption'

export type FontFamilyDef = {
  id: string
  name: string
  cssFamily: string
  cssVariable: string
  weights: Array<{ value: number; label: string }>
  purpose: string
  description: string
  specimenText: string
}

export type TypographyToken = {
  category: TypographyCategory
  name: string
  variable: string
  fontFamily: string
  fontFamilyLabel: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: string
  textTransform?: 'uppercase'
  sampleText: string
  usage: string
}

export type TypographyGroup = {
  category: TypographyCategory
  title: string
  description: string
  tokens: TypographyToken[]
}

const FAMILY_DISPLAY = "'Globotipo Corporativa', sans-serif"
const FAMILY_INTER = "'Inter Variable', 'Inter', sans-serif"

export const FONT_FAMILIES: FontFamilyDef[] = [
  {
    id: 'globotipo-corporativa',
    name: 'Globotipo Corporativa',
    cssFamily: FAMILY_DISPLAY,
    cssVariable: '--font-family-display',
    weights: [
      { value: 400, label: 'Regular' },
    ],
    purpose: 'Display & Headlines',
    description:
      'Fonte primária para títulos de grande destaque, elementos de comunicação expressivos e peças de brand. Utilizada exclusivamente em estilos Display — nunca em textos corridos ou conteúdo de leitura contínua.',
    specimenText: 'Conectando pessoas',
  },
  {
    id: 'inter-variable',
    name: 'Inter Variable',
    cssFamily: FAMILY_INTER,
    cssVariable: '--font-family-body',
    weights: [
      { value: 400, label: 'Regular' },
      { value: 500, label: 'Medium' },
      { value: 600, label: 'Semibold' },
      { value: 700, label: 'Bold' },
    ],
    purpose: 'Interface & Produto',
    description:
      'Fonte principal para toda a interface de produto: títulos de seção, texto de corpo, labels, captions e elementos de formulário. Projetada para alta legibilidade em telas de alta densidade.',
    specimenText: 'Interface de qualidade',
  },
]

export const TYPOGRAPHY_GROUPS: TypographyGroup[] = [
  {
    category: 'display',
    title: 'Display',
    description:
      'Estilos para títulos de grande destaque, heroes, banners e peças de comunicação. Utilizam Globotipo Corporativa e devem ser aplicados com parcimônia para preservar impacto.',
    tokens: [
      {
        category: 'display',
        name: 'Display 2XL',
        variable: '--type-display-2xl',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 80,
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: '-0.025em',
        sampleText: 'Conectando pessoas\natravés do conteúdo',
        usage: 'Hero sections, splash screens, campanhas de grande destaque',
      },
      {
        category: 'display',
        name: 'Display XL',
        variable: '--type-display-xl',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 60,
        fontWeight: 400,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        sampleText: 'Experiências que encantam',
        usage: 'Títulos de seção de alta hierarquia, landing pages, módulos de destaque',
      },
      {
        category: 'display',
        name: 'Display LG',
        variable: '--type-display-lg',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 44,
        fontWeight: 400,
        lineHeight: 1.12,
        letterSpacing: '-0.018em',
        sampleText: 'Design com propósito e intenção',
        usage: 'Subtítulos de hero, cabeçalhos de páginas especiais, módulos editoriais',
      },
      {
        category: 'display',
        name: 'Display MD',
        variable: '--type-display-md',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 36,
        fontWeight: 400,
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
        sampleText: 'Inovação que transforma experiências',
        usage: 'Cabeçalhos de seção expressivos, módulos de destaque intermediários',
      },
      {
        category: 'display',
        name: 'Display SM',
        variable: '--type-display-sm',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 28,
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        sampleText: 'Cada detalhe conta na construção do produto',
        usage: 'Títulos de cards de destaque, chamadas em módulos editoriais, pull quotes',
      },
    ],
  },
  {
    category: 'title',
    title: 'Title',
    description:
      'Escala de títulos para hierarquia de interface, seções, cards e componentes. Utilizam Inter Variable para precisão e consistência em contextos de produto.',
    tokens: [
      {
        category: 'title',
        name: 'Title 2XL',
        variable: '--type-title-2xl',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.03em',
        sampleText: 'Hierarquia visual clara e consistente',
        usage: 'Títulos de página, seções principais de dashboard',
      },
      {
        category: 'title',
        name: 'Title XL',
        variable: '--type-title-xl',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '-0.025em',
        sampleText: 'Componentes de interface consistentes',
        usage: 'Cabeçalhos de módulo, títulos de seção secundária',
      },
      {
        category: 'title',
        name: 'Title LG',
        variable: '--type-title-lg',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
        sampleText: 'Sistema de design adaptável',
        usage: 'Títulos de card, cabeçalhos de painel lateral, grupos de configuração',
      },
      {
        category: 'title',
        name: 'Title MD',
        variable: '--type-title-md',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 1.35,
        letterSpacing: '-0.015em',
        sampleText: 'Tipografia funcional e acessível',
        usage: 'Subtítulos de seção, rótulos de grupo, títulos de modal',
      },
      {
        category: 'title',
        name: 'Title SM',
        variable: '--type-title-sm',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        sampleText: 'Seção e configuração de componentes',
        usage: 'Titles de accordion, rótulos de formulário, cabeçalhos de tabela',
      },
    ],
  },
  {
    category: 'body',
    title: 'Body',
    description:
      'Estilos para texto corrido, descrições, parágrafos e conteúdo de interface. Otimizados para conforto de leitura em múltiplas linhas com Inter Variable.',
    tokens: [
      {
        category: 'body',
        name: 'Body 2XL',
        variable: '--type-body-2xl',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: '0',
        sampleText:
          'O design de produto equilibra forma e função, criando experiências intuitivas que servem às necessidades do usuário e aos objetivos do negócio. Texto amplo, ideal para aberturas editoriais e introduções de alto impacto.',
        usage: 'Aberturas editoriais, textos de introdução de alto impacto, hero body text',
      },
      {
        category: 'body',
        name: 'Body XL',
        variable: '--type-body-xl',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: '0',
        sampleText:
          'A tipografia bem aplicada melhora a legibilidade e guia o olhar do usuário pela hierarquia de informações da interface. Adequado para textos de destaque e parágrafos de maior ênfase.',
        usage: 'Parágrafos de destaque, subtítulos descritivos, textos de introdução de seção',
      },
      {
        category: 'body',
        name: 'Body LG',
        variable: '--type-body-lg',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: '0',
        sampleText:
          'O texto do corpo é a espinha dorsal da comunicação em interface. Uma boa escolha tipográfica garante conforto na leitura, clareza na mensagem e acessibilidade para todos os usuários da plataforma.',
        usage: 'Parágrafos de introdução, descrições longas, textos explicativos',
      },
      {
        category: 'body',
        name: 'Body LG Medium',
        variable: '--type-body-lg-medium',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.7,
        letterSpacing: '0',
        sampleText:
          'Texto de destaque em parágrafos extensos, subtítulos descritivos e conteúdo de maior relevância hierárquica.',
        usage: 'Ênfase em parágrafos longos, subtítulos descritivos, destaques em listas',
      },
      {
        category: 'body',
        name: 'Body MD',
        variable: '--type-body-md',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.65,
        letterSpacing: '0',
        sampleText:
          'Utilize este estilo para parágrafos, descrições de campo e conteúdo principal da interface. Legibilidade é a qualidade mais importante em texto de corpo.',
        usage: 'Texto padrão de interface, parágrafos, descrições de componente',
      },
      {
        category: 'body',
        name: 'Body MD Medium',
        variable: '--type-body-md-medium',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.65,
        letterSpacing: '0',
        sampleText:
          'Conteúdo em destaque ou com ênfase equilibrada, mantendo o ritmo visual do texto corrido e a coerência com o estilo Body padrão.',
        usage: 'Ênfase em parágrafos, termos importantes, labels de interface com hierarquia moderada',
      },
      {
        category: 'body',
        name: 'Body SM',
        variable: '--type-body-sm',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0',
        sampleText:
          'Textos auxiliares, notas e informações secundárias que complementam o conteúdo principal sem competir com a hierarquia visual estabelecida.',
        usage: 'Notas de rodapé, textos de ajuda, informações complementares',
      },
      {
        category: 'body',
        name: 'Body SM Medium',
        variable: '--type-body-sm-medium',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '0',
        sampleText:
          'Notas e informações auxiliares com ênfase leve, preservando a hierarquia sem competir com o conteúdo principal.',
        usage: 'Labels auxiliares com ênfase, notas destacadas, metadados com relevância moderada',
      },
    ],
  },
  {
    category: 'caption',
    title: 'Caption',
    description:
      'Estilos para metadados, rótulos, tags e informações de suporte. Projetados para máxima legibilidade em tamanhos reduzidos.',
    tokens: [
      {
        category: 'caption',
        name: 'Caption MD',
        variable: '--type-caption-md',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0.005em',
        sampleText: 'Rótulos de campo, metadados e informações de status de componentes',
        usage: 'Labels de formulário, badges, timestamps, metadados',
      },
      {
        category: 'caption',
        name: 'Caption SM',
        variable: '--type-caption-sm',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.35,
        letterSpacing: '0.006em',
        sampleText: 'Tags, versões e anotações auxiliares de interface',
        usage: 'Tags de versão, tooltips, anotações de baixa prioridade',
      },
      {
        category: 'caption',
        name: 'Overline',
        variable: '--type-overline',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        sampleText: 'categoria e seção de navegação',
        usage: 'Overlines de seção, breadcrumbs, labels de categoria em caixa alta',
      },
    ],
  },
]

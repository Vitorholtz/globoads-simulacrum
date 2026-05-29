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
  className: string
  fontFamily: string
  fontFamilyLabel: string
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: string
  textTransform?: 'uppercase'
  sampleText: string
  usage: string
  fixedTokens: string[]
  contextualTokens: string[]
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
    cssVariable: '--font-family-display-01',
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
    cssVariable: '--font-family-sans',
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
        name: 'Display/3XL',
        className: 'type-display-3xl',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 80,
        fontWeight: 400,
        lineHeight: 80,
        letterSpacing: '0',
        sampleText: 'Globo Ads.',
        usage: 'Peças de brand de máximo impacto, splash screens de campanha',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-500', '--line-height-500'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'display',
        name: 'Display/2XL',
        className: 'type-display-2xl',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 68,
        fontWeight: 400,
        lineHeight: 68,
        letterSpacing: '0',
        sampleText: 'Alcance o Brasil\ncom a Globo.',
        usage: 'Hero sections, splash screens, campanhas de grande destaque',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-425', '--line-height-425'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'display',
        name: 'Display/XL',
        className: 'type-display-xl',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 56,
        fontWeight: 400,
        lineHeight: 56,
        letterSpacing: '0',
        sampleText: 'TV, Digital e TV Conectada.',
        usage: 'Títulos de seção de alta hierarquia, landing pages, módulos de destaque',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-350', '--line-height-350'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'display',
        name: 'Display/LG',
        className: 'type-display-lg',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 48,
        fontWeight: 400,
        lineHeight: 48,
        letterSpacing: '0',
        sampleText: 'Milhões de impressões por dia.',
        usage: 'Subtítulos de hero, cabeçalhos de páginas especiais, módulos editoriais',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-300', '--line-height-300'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'display',
        name: 'Display/MD',
        className: 'type-display-md',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 40,
        fontWeight: 400,
        lineHeight: 40,
        letterSpacing: '0',
        sampleText: 'Campanhas que geram impacto real.',
        usage: 'Cabeçalhos de seção expressivos, módulos de destaque intermediários',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-250', '--line-height-250'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'display',
        name: 'Display/SM',
        className: 'type-display-sm',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 32,
        fontWeight: 400,
        lineHeight: 32,
        letterSpacing: '0',
        sampleText: 'Ative sua marca no maior ecossistema de mídia do Brasil.',
        usage: 'Títulos de cards de destaque, chamadas em módulos editoriais, pull quotes',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-200', '--line-height-200'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'display',
        name: 'Display/XS',
        className: 'type-display-xs',
        fontFamily: FAMILY_DISPLAY,
        fontFamilyLabel: 'Globotipo Corporativa',
        fontSize: 24,
        fontWeight: 400,
        lineHeight: 24,
        letterSpacing: '0',
        sampleText: 'G1, GE, GSHOW e Globo.com.',
        usage: 'Chamadas compactas, labels de seção com identidade de marca, destaques em contextos densos',
        fixedTokens: ['--font-family-display-01', '--font-weight-regular', '--font-size-150', '--line-height-150'],
        contextualTokens: ['--color-fill-[primary]'],
      },
    ],
  },
  {
    category: 'title',
    title: 'Title',
    description:
      'Escala de títulos para hierarquia de interface, seções, cards e componentes. Utilizam Inter Variable em peso Semibold para precisão e consistência em contextos de produto.',
    tokens: [
      {
        category: 'title',
        name: 'Title/LG',
        className: 'type-title-lg',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 28,
        letterSpacing: '0',
        sampleText: 'Desempenho da campanha',
        usage: 'Títulos de card, cabeçalhos de painel lateral, grupos de configuração',
        fixedTokens: ['--font-family-sans', '--font-weight-semibold', '--font-size-150', '--line-height-175'],
        contextualTokens: ['--color-fill-[primary]', '--text-decoration-[none]'],
      },
      {
        category: 'title',
        name: 'Title/MD',
        className: 'type-title-md',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24,
        letterSpacing: '0',
        sampleText: 'Resumo de impressões e diárias',
        usage: 'Subtítulos de seção, rótulos de grupo, títulos de modal',
        fixedTokens: ['--font-family-sans', '--font-weight-semibold', '--font-size-125', '--line-height-150'],
        contextualTokens: ['--color-fill-[primary]', '--text-decoration-[none]'],
      },
      {
        category: 'title',
        name: 'Title/SM',
        className: 'type-title-sm',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 20,
        letterSpacing: '0',
        sampleText: 'Configuração de veiculação',
        usage: 'Títulos de accordion, rótulos de formulário, cabeçalhos de tabela',
        fixedTokens: ['--font-family-sans', '--font-weight-semibold', '--font-size-100', '--line-height-125'],
        contextualTokens: ['--color-fill-[primary]', '--text-decoration-[none]'],
      },
    ],
  },
  {
    category: 'body',
    title: 'Body',
    description:
      'Estilos para texto corrido, descrições, parágrafos e conteúdo de interface. O font-weight é contextual — pode variar entre Regular, Medium e Semibold conforme a hierarquia de cada uso.',
    tokens: [
      {
        category: 'body',
        name: 'Body/LG',
        className: 'type-body-lg',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 32,
        letterSpacing: '0',
        sampleText:
          'A Globo oferece o maior inventário de mídia do Brasil,\nunindo TV aberta, TV Conectada e plataformas digitais\npara maximizar o alcance das suas campanhas.',
        usage: 'Aberturas editoriais, textos de introdução de alto impacto, hero body text',
        fixedTokens: ['--font-family-sans', '--font-size-125', '--line-height-200'],
        contextualTokens: ['--font-weight-[regular]', '--color-fill-[primary]', '--text-decoration-[none]'],
      },
      {
        category: 'body',
        name: 'Body/MD',
        className: 'type-body-md',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24,
        letterSpacing: '0',
        sampleText:
          'Com o Globo Ads, você planeja, ativa e acompanha campanhas\nem TV, digital e TV Conectada — com dados de audiência\nem tempo real e total visibilidade sobre impressões e diárias.',
        usage: 'Parágrafos de introdução, descrições longas, textos explicativos',
        fixedTokens: ['--font-family-sans', '--font-size-100', '--line-height-150'],
        contextualTokens: ['--font-weight-[regular]', '--color-fill-[primary]', '--text-decoration-[none]'],
      },
      {
        category: 'body',
        name: 'Body/SM',
        className: 'type-body-sm',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        letterSpacing: '0',
        sampleText:
          'Acompanhe o desempenho dos seus anúncios\nem G1, GE, GSHOW e Globo.com. Relatórios de\nimpress​ões, cliques e impactos por período de veiculação.',
        usage: 'Texto padrão de interface, parágrafos, descrições de componente',
        fixedTokens: ['--font-family-sans', '--font-size-087', '--line-height-125'],
        contextualTokens: ['--font-weight-[regular]', '--color-fill-[primary]', '--text-decoration-[none]'],
      },
      {
        category: 'body',
        name: 'Body/XS',
        className: 'type-body-xs',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 16,
        letterSpacing: '0',
        sampleText:
          'Dados de audiência atualizados diariamente\npara todas as praças e formatos disponíveis no Globo Ads.',
        usage: 'Notas de rodapé, textos de ajuda, informações complementares',
        fixedTokens: ['--font-family-sans', '--font-size-075', '--line-height-100'],
        contextualTokens: ['--font-weight-[regular]', '--color-fill-[primary]', '--text-decoration-[none]'],
      },
    ],
  },
  {
    category: 'caption',
    title: 'Caption',
    description:
      'Estilos para metadados, rótulos, tags e informações de suporte. Todos os tokens Caption usam font-weight Medium como valor fixo.',
    tokens: [
      {
        category: 'caption',
        name: 'Caption/LG',
        className: 'type-caption-lg',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 20,
        letterSpacing: '0',
        sampleText: 'Impressões · Diárias · Impactos · TV Conectada',
        usage: 'Labels de navegação, cabeçalhos de coluna, rótulos de campo proeminentes',
        fixedTokens: ['--font-family-sans', '--font-weight-medium', '--font-size-100', '--line-height-125'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'caption',
        name: 'Caption/MD',
        className: 'type-caption-md',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 16,
        letterSpacing: '0',
        sampleText: 'Período de veiculação · Praça · Formato · Canal',
        usage: 'Labels de formulário, badges, timestamps, metadados',
        fixedTokens: ['--font-family-sans', '--font-weight-medium', '--font-size-087', '--line-height-100'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'caption',
        name: 'Caption/SM',
        className: 'type-caption-sm',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 16,
        letterSpacing: '0',
        sampleText: 'G1 · GE · GSHOW · Globo.com · Globo Ads',
        usage: 'Tags de versão, tooltips, anotações de baixa prioridade',
        fixedTokens: ['--font-family-sans', '--font-weight-medium', '--font-size-075', '--line-height-100'],
        contextualTokens: ['--color-fill-[primary]'],
      },
      {
        category: 'caption',
        name: 'Caption/XS',
        className: 'type-caption-xs',
        fontFamily: FAMILY_INTER,
        fontFamilyLabel: 'Inter Variable',
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 12,
        letterSpacing: '0',
        sampleText: 'Atualizado em tempo real · Globo Ads',
        usage: 'Anotações de baixa prioridade, versões, tooltips de detalhe',
        fixedTokens: ['--font-family-sans', '--font-weight-medium', '--font-size-062', '--line-height-075'],
        contextualTokens: ['--color-fill-[primary]'],
      },
    ],
  },
]

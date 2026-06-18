import type { CreativeTextContent } from '../../components/CreativeCard/types'
import type { TextSchema } from './displayFormats'

/**
 * Serialização e leitura do conteúdo de texto de um asset composto (o `.txt`
 * dentro do `.zip`). As duas direções vivem juntas de propósito: `serializeText`
 * (download) e `parseTextBySchema` (upload/classificação) são **inversas** — o
 * que uma grava a outra precisa conseguir reler. Mantê-las no mesmo módulo,
 * com teste de ida-e-volta, impede que uma mude sem a outra acompanhar.
 */

/** Dica exibida quando o `.txt` não pôde ser lido, por esquema de texto. */
export const TEXT_HINT: Record<TextSchema, string> = {
  cta: 'Use linhas como "cta=...", "corBotao=#...", "corTexto=#...".',
  'titulo-subtitulo': 'Use linhas como "titulo=..." e "subtitulo=...".',
}

/** Serializa o conteúdo de texto no formato `chave=valor` lido por `parseTextBySchema`. */
export function serializeText(text: CreativeTextContent): string {
  if (text.variant === 'cta') {
    return `cta=${text.ctaText}\ncorBotao=${text.buttonColor}\ncorTexto=${text.textColor}`
  }
  return `titulo=${text.title}\nsubtitulo=${text.subtitle}`
}

/** Interpreta o conteúdo cru do `.txt` conforme o esquema declarado no manifesto. */
export function parseTextBySchema(content: string, schema: TextSchema): CreativeTextContent | null {
  return schema === 'cta' ? parseCtaText(content) : parseTitleText(content)
}

/** Lê um `.txt` em pares `chave=valor` (ou `chave: valor`) num mapa normalizado. */
function readKeyValues(content: string): Map<string, string> {
  const fields = new Map<string, string>()
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    const sep = line.search(/[:=]/)
    if (sep < 0) continue
    const key = normalizeKey(line.slice(0, sep))
    const value = line.slice(sep + 1).trim()
    if (key && value && !fields.has(key)) fields.set(key, value)
  }
  return fields
}

/** Encontra o primeiro valor cuja chave satisfaz o predicado. */
function findValue(
  fields: Map<string, string>,
  match: (key: string) => boolean
): string | undefined {
  for (const [key, value] of fields) {
    if (match(key)) return value
  }
  return undefined
}

/**
 * Lê o `.txt` do CTA num formato `chave=valor` (ou `chave: valor`) tolerante:
 * uma chave com "cta" vira o texto; "botao"/"fundo" a cor do botão; "cor"/"color"
 * a cor do texto. Retorna `null` se faltar algum dos três campos.
 *
 * Exemplo aceito:
 *   cta=Assine agora
 *   corBotao=#F2630A
 *   corTexto=#FFFFFF
 */
function parseCtaText(content: string): CreativeTextContent | null {
  const fields = readKeyValues(content)
  // A chave da cor do botão (ex.: "corBotao") também contém "cor"; por isso o
  // critério de cor do texto exclui as chaves de botão, senão "corBotao" seria
  // capturado pelos dois campos (e a cor do texto herdaria a cor do botão).
  const isButtonKey = (k: string) =>
    k.includes('botao') || k.includes('fundo') || k.includes('background') || k === 'bg'
  const ctaText = findValue(fields, (k) => k.includes('cta') || k === 'texto' || k === 'text')
  const buttonColor = findValue(fields, isButtonKey)
  const textColor = findValue(
    fields,
    (k) => !isButtonKey(k) && (k.includes('cor') || k.includes('color'))
  )
  if (!ctaText || !buttonColor || !textColor) return null
  return {
    variant: 'cta',
    ctaText,
    buttonColor: normalizeHex(buttonColor),
    textColor: normalizeHex(textColor),
  }
}

/**
 * Lê o `.txt` de título/subtítulo (Carrossel) num formato `chave=valor` tolerante:
 * uma chave com "titulo" vira o título; "subtitulo" o subtítulo. Retorna `null`
 * se faltar algum dos dois campos.
 *
 * Exemplo aceito:
 *   titulo=Café Orfeu
 *   subtitulo=O melhor da serra na sua xícara
 */
function parseTitleText(content: string): CreativeTextContent | null {
  const fields = readKeyValues(content)
  // "subtitulo" inclui "titulo"; por isso o subtítulo é resolvido primeiro.
  const subtitle = findValue(fields, (k) => k.includes('subtitulo') || k.includes('subtitle'))
  const title = findValue(
    fields,
    (k) => (k.includes('titulo') || k.includes('title')) && !k.includes('sub')
  )
  if (!title || !subtitle) return null
  return { variant: 'titulo-subtitulo', title, subtitle }
}

/** Normaliza a chave: minúscula, sem acentos, só letras e números. */
function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

/** Garante o `#` inicial e o hex em maiúsculas. */
function normalizeHex(value: string): string {
  return `#${value.trim().replace(/^#/, '').toUpperCase()}`
}

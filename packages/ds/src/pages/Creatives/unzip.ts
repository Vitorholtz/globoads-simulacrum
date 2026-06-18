/**
 * Leitor mínimo de arquivos `.zip` usando **apenas APIs nativas** do browser —
 * sem dependências externas, alinhado ao princípio de `classifyCreative.ts`.
 *
 * Percorre o **central directory** (e não os local headers em streaming) porque
 * ele sempre carrega tamanhos e offsets corretos, mesmo quando o arquivo usa
 * data descriptors. A descompressão usa `DecompressionStream('deflate-raw')`,
 * que cobre o método DEFLATE (8); arquivos "stored" (0) são copiados direto.
 */

export interface ZipEntry {
  /** Caminho da entrada dentro do `.zip` (ex.: "imagens/desktop.jpg"). */
  name: string
  /** `ArrayBuffer`-backed para ser aceito direto por `Blob`/`BlobPart`. */
  bytes: Uint8Array<ArrayBuffer>
}

const SIG_EOCD = 0x06054b50 // PK\x05\x06 — End Of Central Directory
const SIG_CDH = 0x02014b50 // PK\x01\x02 — Central Directory Header

/** Extrai todas as entradas (arquivos, ignora diretórios) de um `.zip`. */
export async function unzip(file: File): Promise<ZipEntry[]> {
  const buffer = await file.arrayBuffer()
  const view = new DataView(buffer)
  const bytes = new Uint8Array(buffer)

  const eocd = findEocd(view)
  if (eocd < 0) throw new Error('Arquivo .zip inválido: fim do diretório central não encontrado.')

  const total = view.getUint16(eocd + 10, true)
  let pointer = view.getUint32(eocd + 16, true)

  const entries: ZipEntry[] = []
  for (let i = 0; i < total; i++) {
    if (view.getUint32(pointer, true) !== SIG_CDH) {
      throw new Error('Arquivo .zip corrompido: cabeçalho do diretório central inválido.')
    }
    const method = view.getUint16(pointer + 10, true)
    const compressedSize = view.getUint32(pointer + 20, true)
    const nameLen = view.getUint16(pointer + 28, true)
    const extraLen = view.getUint16(pointer + 30, true)
    const commentLen = view.getUint16(pointer + 32, true)
    const localOffset = view.getUint32(pointer + 42, true)
    const name = new TextDecoder().decode(bytes.subarray(pointer + 46, pointer + 46 + nameLen))

    // Os dados começam após o local header: 30 bytes fixos + nome + extra
    // (cujos tamanhos podem diferir dos do diretório central).
    const localNameLen = view.getUint16(localOffset + 26, true)
    const localExtraLen = view.getUint16(localOffset + 28, true)
    const dataStart = localOffset + 30 + localNameLen + localExtraLen
    const compressed = bytes.subarray(dataStart, dataStart + compressedSize)

    // Pula diretórios (terminam em "/" e não têm conteúdo).
    if (!name.endsWith('/')) {
      const data = method === 0 ? compressed.slice() : await inflateRaw(compressed)
      entries.push({ name, bytes: data })
    }

    pointer += 46 + nameLen + extraLen + commentLen
  }

  return entries
}

/** Localiza o EOCD varrendo de trás para frente (após o comentário opcional). */
function findEocd(view: DataView): number {
  const min = Math.max(0, view.byteLength - 22 - 0xffff)
  for (let i = view.byteLength - 22; i >= min; i--) {
    if (view.getUint32(i, true) === SIG_EOCD) return i
  }
  return -1
}

/** Descomprime um bloco DEFLATE cru via stream nativo. */
async function inflateRaw(compressed: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
  const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
  const decompressed = await new Response(stream).arrayBuffer()
  return new Uint8Array(decompressed)
}

/**
 * Criador mínimo de arquivos `.zip` usando **apenas APIs nativas** do browser —
 * sem dependências externas, par simétrico de `unzip.ts`.
 *
 * Usa o método STORED (sem compressão) para os assets já descomprimidos em memória.
 * Computa CRC-32 (ISO 3309) necessário para qualquer entry ZIP, mesmo stored.
 */

export interface ZipEntry {
  /** Caminho / nome do arquivo dentro do `.zip`. */
  name: string
  bytes: Uint8Array
}

function crc32(data: Uint8Array): number {
  let c = 0xffffffff
  for (let i = 0; i < data.length; i++) {
    c ^= data[i]
    for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0)
  }
  return ~c >>> 0
}

const ENC = new TextEncoder()

/**
 * Cria um `.zip` STORED a partir das entradas fornecidas.
 * Retorna um `Uint8Array` pronto para ser passado a `new Blob([...], { type: 'application/zip' })`.
 */
export function createZip(files: ZipEntry[]): Uint8Array {
  const names = files.map((f) => ENC.encode(f.name))
  const crcs = files.map((f) => crc32(f.bytes))
  const offsets: number[] = []

  // Calcula offsets dos local headers
  let totalLocal = 0
  for (let i = 0; i < files.length; i++) {
    offsets.push(totalLocal)
    totalLocal += 30 + names[i].length + files[i].bytes.length
  }

  const cdOffset = totalLocal
  const cdSize = files.reduce((s, _, i) => s + 46 + names[i].length, 0)
  const buf = new Uint8Array(cdOffset + cdSize + 22)
  const v = new DataView(buf.buffer)
  let p = 0

  const w32 = (n: number) => {
    v.setUint32(p, n, true)
    p += 4
  }
  const w16 = (n: number) => {
    v.setUint16(p, n, true)
    p += 2
  }
  const wb = (b: Uint8Array) => {
    buf.set(b, p)
    p += b.length
  }

  // Local file headers + dados
  for (let i = 0; i < files.length; i++) {
    const sz = files[i].bytes.length
    w32(0x04034b50)
    w16(20)
    w16(0)
    w16(0)
    w16(0)
    w16(0)
    w32(crcs[i])
    w32(sz)
    w32(sz)
    w16(names[i].length)
    w16(0)
    wb(names[i])
    wb(files[i].bytes)
  }

  // Central directory
  for (let i = 0; i < files.length; i++) {
    const sz = files[i].bytes.length
    w32(0x02014b50)
    w16(20)
    w16(20)
    w16(0)
    w16(0)
    w16(0)
    w16(0)
    w32(crcs[i])
    w32(sz)
    w32(sz)
    w16(names[i].length)
    w16(0)
    w16(0)
    w16(0)
    w16(0)
    w32(0)
    w32(offsets[i])
    wb(names[i])
  }

  // End of central directory
  w32(0x06054b50)
  w16(0)
  w16(0)
  w16(files.length)
  w16(files.length)
  w32(cdSize)
  w32(cdOffset)
  w16(0)

  return buf
}

export type AdFormatCategory = 'display' | 'video' | 'native'

export type AdDevice = 'desktop' | 'mobile'

export type AdFileType = 'JPG' | 'PNG' | 'GIF' | 'HTML5' | 'MP4' | 'MOV' | 'AVI'

export interface AdFormatDimensions {
  width: number
  height: number
  /** "Desktop" | "Mobile" | "720p" | "1080p" | "Logotipo" etc. */
  label?: string
}

export interface AdFormatFileLimits {
  staticKB?: number
  html5KB?: number
  videoMB?: number
  /** Para formatos com múltiplas imagens independentes (ex: Carrossel) */
  perImageKB?: number
}

export interface AdFormatTextField {
  name: string
  maxChars: number
}

export interface AdFormatVideoDuration {
  label: string
  maxSeconds: number
  skippable: boolean
}

export interface AdFormat {
  id: string
  name: string
  description: string
  category: AdFormatCategory
  devices: AdDevice[]
  dimensions: AdFormatDimensions[]
  fileLimits: AdFormatFileLimits
  acceptedFileTypes: AdFileType[]
  videoDurations?: AdFormatVideoDuration[]
  textFields?: AdFormatTextField[]
  /** Instruções especiais de entrega (zip, múltiplas peças, etc.) */
  deliveryNotes?: string
  svgPath?: string
}

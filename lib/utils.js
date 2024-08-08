import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const splitSignature = signature => {
  const pureSig = signature.replace('0x', '')

  const r = Buffer.from(pureSig.substring(0, 64), 'hex')
  const s = Buffer.from(pureSig.substring(64, 128), 'hex')
  const v = Buffer.alloc(parseInt(pureSig.substring(128, 130), 16).toString())

  return { r, s, v }
}

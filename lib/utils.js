import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000)
}

export function splitSignature(signature) {
  console.log(signature)
  if (signature.length !== 132) {
    throw new Error(
      'Invalid signature length. Signature must be 65 bytes in hexadecimal format.'
    )
  }

  // Convert the signature from hex to a buffer
  const sigBuffer = Buffer.from(signature.slice(2), 'hex')

  // Split the signature into r, s, v
  const r = sigBuffer.slice(0, 32).toString('hex')
  const s = sigBuffer.slice(32, 64).toString('hex')
  let v = sigBuffer[64]

  // Adjust v to be 27 or 28, as per the Ethereum standard
  if (v < 27) {
    v += 27
  }

  return { r, s, v }
}

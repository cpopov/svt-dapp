import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt
} from '@wagmi/core'
import tokenIssuerAbi from '@/lib/abi/tokenIssuerAbi'
import { ethers } from 'ethers'
import { config } from './wagmi/config'

export const buyToken = async (amount, contractAddress) => {
  try {
    const { request } = await simulateContract(config, {
      abi: tokenIssuerAbi,
      address: contractAddress,
      functionName: 'buy',
      args: [ethers.parseEther(amount?.toString())]
    })

    const hash = await writeContract(config, request)

    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    throw error
  }
}

export const sellToken = async (amount, contractAddress) => {
  try {
    const { request } = await simulateContract(config, {
      abi: tokenIssuerAbi,
      address: contractAddress,
      functionName: 'sell',
      args: [ethers.parseEther(amount?.toString())]
    })

    const hash = await writeContract(config, request)

    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    throw error
  }
}

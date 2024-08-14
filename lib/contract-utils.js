import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
  signTypedData,
  readContract,
  readContracts
} from '@wagmi/core'
import tokenIssuerAbi from '@/lib/abi/tokenIssuerAbi'
import MockUSDCAbi from '@/lib/abi/MockUSDCAbi'
import playerTokenAbi from '@/lib/abi/playerTokenAbi'
import { ethers } from 'ethers'
import { config } from './wagmi/config'

export const buyTokenAuth = async (
  amount,
  deadline,
  { r, s, v },
  issuerContract
) => {
  try {
    const { request } = await simulateContract(config, {
      abi: tokenIssuerAbi,
      address: issuerContract,
      functionName: 'buyWithAuthorisation',
      args: [ethers.parseEther(amount?.toString()), deadline, v, r, s]
    })

    const hash = await writeContract(config, request)

    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    throw error
  }
}

export const sellTokenAuth = async (
  amount,
  deadline,
  { r, s, v },
  issuerContract
) => {
  try {
    const { request } = await simulateContract(config, {
      abi: tokenIssuerAbi,
      address: issuerContract,
      functionName: 'sellWithAuthorisation',
      args: [ethers.parseEther(amount?.toString()), deadline, v, r, s]
    })

    const hash = await writeContract(config, request)

    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    throw error
  }
}

export const signingMessage = async (
  signer,
  owner,
  spender,
  value,
  deadline,
  tokenAddress,
  chainId,
  tokenName
) => {
  try {
    const contractInstance = new ethers.Contract(
      tokenAddress,
      tokenName === 'MockERC20' ? MockUSDCAbi : playerTokenAbi,
      signer.provider
    )
    const nonce = await contractInstance.nonces(owner)

    const typedValue = {
      types: {
        EIP712Domain: [
          {
            name: 'name',
            type: 'string'
          },
          {
            name: 'version',
            type: 'string'
          },
          {
            name: 'chainId',
            type: 'uint256'
          },
          {
            name: 'verifyingContract',
            type: 'address'
          }
        ],
        Permit: [
          {
            name: 'owner',
            type: 'address'
          },
          {
            name: 'spender',
            type: 'address'
          },
          {
            name: 'value',
            type: 'uint256'
          },
          {
            name: 'nonce',
            type: 'uint256'
          },
          {
            name: 'deadline',
            type: 'uint256'
          }
        ]
      },
      primaryType: 'Permit',
      domain: {
        name: tokenName,
        version: '1',
        verifyingContract: tokenAddress,
        chainId
      },
      message: {
        owner,
        spender,
        value: ethers.parseEther(value.toString()),
        nonce,
        deadline
      }
    }

    const resposnse = await signTypedData(config, typedValue)
    return ethers.Signature.from(resposnse)
  } catch (error) {
    throw error
  }
}

export const buyTokenWithSign = async (
  signer,
  owner,
  spender,
  value,
  deadline,
  tokenAddress,
  chainId
) => {
  try {
    const signature = await signingMessage(
      signer,
      owner,
      spender,
      value,
      deadline,
      tokenAddress,
      chainId,
      'MockERC20'
    )

    return await buyTokenAuth(value, deadline, signature, spender)
  } catch (error) {
    throw error
  }
}

export const sellTokenWithSign = async (
  signer,
  owner,
  spender,
  value,
  deadline,
  tokenAddress,
  chainId
) => {
  try {
    const signature = await signingMessage(
      signer,
      owner,
      spender,
      value,
      deadline,
      tokenAddress,
      chainId,
      'PlayerToken'
    )

    return await sellTokenAuth(value, deadline, signature, spender)
  } catch (error) {
    throw error
  }
}

export const readEstimate = async (amount, issuerContract) => {
  try {
    const result = await readContracts(config, {
      contracts: [
        {
          abi: tokenIssuerAbi,
          address: issuerContract,
          functionName: 'previewBuy',
          args: [amount]
        },
        {
          abi: tokenIssuerAbi,
          address: issuerContract,
          functionName: 'previewSell',
          args: [amount]
        }
      ]
    })
    return { previewBuy: result[0]?.result, previewSell: result[1]?.result }
  } catch (error) {
    throw error
  }
}

export const balanceOf = async (owner, contractAddress) => {
  try {
    return await readContract(config, {
      abi: MockUSDCAbi,
      address: contractAddress,
      functionName: 'balanceOf',
      args: [owner]
    })
  } catch (error) {
    throw error
  }
}

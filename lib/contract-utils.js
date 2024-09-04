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

const usdcAddress = process.env.NEXT_PUBLIC_USDT_ADDRESS

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
      args: [amount, deadline, v, r, s]
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
      args: [amount, deadline, v, r, s]
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
        version: tokenName === 'PlayerToken' ? '1' : '2',
        verifyingContract: tokenAddress,
        chainId
      },
      message: {
        owner,
        spender,
        value,
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
    const amount = ethers.parseUnits(value.toString(), 'mwei')
    const signature = await signingMessage(
      signer,
      owner,
      spender,
      amount,
      deadline,
      tokenAddress,
      chainId,
      chainId === 11155111 ? 'MockERC20' : 'USD Coin'
    )

    return await buyTokenAuth(amount, deadline, signature, spender)
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
    const amount = ethers.parseEther(value.toString())
    const signature = await signingMessage(
      signer,
      owner,
      spender,
      amount,
      deadline,
      tokenAddress,
      chainId,
      'PlayerToken'
    )

    return await sellTokenAuth(amount, deadline, signature, spender)
  } catch (error) {
    throw error
  }
}

export const readEstimate = async (amount, issuerContract, chainId) => {
  try {
    const result = await readContracts(config, {
      contracts: [
        {
          abi: tokenIssuerAbi,
          address: issuerContract,
          functionName: 'previewBuy',
          args:
            chainId === 11155111
              ? [ethers.parseEther(amount.toString())]
              : [ethers.parseUnits(amount.toString(), 'mwei')]
        },
        {
          abi: tokenIssuerAbi,
          address: issuerContract,
          functionName: 'previewSell',
          args: [ethers.parseEther(amount.toString())]
        }
      ]
    })

    return { previewBuy: result[0]?.result, previewSell: result[1]?.result }
  } catch (error) {
    console.log(error)
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

export const balanceOfUsdc = async owner => {
  try {
    return balanceOf(owner, usdcAddress)
  } catch (error) {
    throw error
  }
}

export const formatEth = (amount, chainId) => {
  if (chainId === 11155111) {
    return ethers.formatUnits(amount.toString())
  } else {
    return ethers.formatUnits(amount.toString(), 'mwei')
  }
}

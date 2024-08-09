import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
  signMessage,
  signTypedData,
  readContract
} from '@wagmi/core'
import tokenIssuerAbi from '@/lib/abi/tokenIssuerAbi'
import MockUSDCAbi from '@/lib/abi/MockUSDCAbi'
import playerTokenAbi from '@/lib/abi/playerTokenAbi'
import { ethers } from 'ethers'
import { config } from './wagmi/config'
const usdt =
  process.env.NEXT_PUBLIC_USDT_ADDRESS ||
  '0x2d90C8D7ADfC4Db1871f7B85e27Ad736c7729a34'

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
export const buyTokenAuth = async (
  amount,
  deadline,
  { r, s, v },
  contractAddress
) => {
  try {
    const { request } = await simulateContract(config, {
      abi: tokenIssuerAbi,
      address: contractAddress,
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
export const signIn = async (owner, spender, deadline) => {
  try {
    const domainType = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' }
    ]
    const types = {
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
    }

    const permit = {
      owner,
      spender,
      value: '1000000000000000000',
      nonce: '13',
      deadline
    }

    const domain = {
      name: 'Test USDC',
      version: '1',
      verifyingContract: usdt,
      chainId: '11155111'
    }

    const data = await signTypedData(config, {
      types,
      domain,
      primaryType: 'Permit',
      message: permit
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export const permitToken = async (
  owner,
  spender,
  value,
  deadline,
  { v, r, s }
) => {
  try {
    const { request } = await simulateContract(config, {
      abi: MockUSDCAbi,
      address: usdt,
      functionName: 'permit',
      args: [
        owner,
        spender,
        ethers.parseEther(value?.toString()),
        deadline,
        v,
        r,
        s
      ]
    })

    const hash = await writeContract(config, request)
    console.log(hash)
    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    console.log(error)
  }
}
export const signingMessage = async (owner, spender, value, deadline) => {
  try {
    const types = {
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
    }

    const values = {
      owner,
      spender,
      value,
      nonce: 0,
      deadline: deadline
    }

    const domain = {
      name: 'Test USDC',
      version: '1',
      chainId: '11155111',
      verifyingContract: '0x2d90C8D7ADfC4Db1871f7B85e27Ad736c7729a34'
    }
    const domainType = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' }
    ]

    const dataToSign = JSON.stringify({
      types: { EIP712Domain: domainType, Permit: types.Permit },
      domain: domain,
      primaryType: 'Permit',
      message: values
    })
    return await signMessage(config, dataToSign)
  } catch (error) {
    console.log(error)
  }
}

export const approve = async (spender, amount) => {
  try {
    const { request } = await simulateContract(config, {
      abi: MockUSDCAbi,
      address: usdt,
      functionName: 'approve',
      args: [spender, ethers.parseEther(amount?.toString())]
    })

    const hash = await writeContract(config, request)

    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    throw error
  }
}
export const approvePlayerToken = async (tokenAddr, spender, amount) => {
  try {
    const { request } = await simulateContract(config, {
      abi: playerTokenAbi,
      address: tokenAddr,
      functionName: 'approve',
      args: [spender, ethers.parseEther(amount?.toString())]
    })

    const hash = await writeContract(config, request)

    return await waitForTransactionReceipt(config, {
      hash
    })
  } catch (error) {
    throw error
  }
}

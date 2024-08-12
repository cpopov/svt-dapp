import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
  signTypedData
} from '@wagmi/core'
import tokenIssuerAbi from '@/lib/abi/tokenIssuerAbi'
import MockUSDCAbi from '@/lib/abi/MockUSDCAbi'
import playerTokenAbi from '@/lib/abi/playerTokenAbi'
import { ethers } from 'ethers'
import { config } from './wagmi/config'

const usdc =
  process.env.NEXT_PUBLIC_USDT_ADDRESS ||
  '0x2d90C8D7ADfC4Db1871f7B85e27Ad736c7729a34'

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'

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
      address: usdc,
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

export const approve = async (spender, amount) => {
  try {
    const { request } = await simulateContract(config, {
      abi: MockUSDCAbi,
      address: usdc,
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

export const buyTokenWithApprove = async (amount, issuerContract) => {
  try {
    await approve(issuerContract, amount)
    return await buyToken(amount, issuerContract)
  } catch (error) {
    throw error
  }
}

export const buyTokenWithSign = async (
  signer,
  owner,
  spender,
  value,
  deadline
) => {
  try {
    const signature = await signingMessage(
      signer,
      owner,
      spender,
      value,
      deadline,
      usdc,
      'MockERC20'
    )

    return await buyTokenAuth(value, deadline, signature, spender)
  } catch (error) {
    throw error
  }
}

export const sellTokenWithApprove = async (
  amount,
  issuerContract,
  tokenAddress
) => {
  try {
    await approvePlayerToken(tokenAddress, issuerContract, amount)
    return await sellToken(amount, issuerContract)
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
  tokenAddress
) => {
  try {
    const signature = await signingMessage(
      signer,
      owner,
      spender,
      value,
      deadline,
      tokenAddress,
      'PlayerToken'
    )

    return await sellTokenAuth(value, deadline, signature, spender)
  } catch (error) {
    throw error
  }
}

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import React, { useEffect, useState } from 'react'
import { balanceOf, balanceOfUsdc } from '@/lib/contract-utils'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import BuySell from '@/components/BuySell'

function TradeButton({ data, ctaText = 'Trade' }) {
  const { address, isConnected } = useAccount()
  const [action, setAction] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [balance, setBalance] = useState(0)
  const [balanceUsdc, setBalanceUsdc] = useState(0)
  const [refresh, setRefresh] = useState(new Date())
  const { open } = useWeb3Modal()

  useEffect(() => {
    if (isConnected) {
      balanceOf(address, data.tokenAddr)
        .then(bal => {
          setBalance(bal)
        })
        .catch(e => console.log('Balance fetching: ', e))

      balanceOfUsdc(address, data.tokenAddr)
        .then(bal => {
          setBalanceUsdc(bal)
        })
        .catch(e => console.log('Balance fetching usdc: ', e))
    }
  }, [data, address, refresh])

  // Reset action when dialog closed
  useEffect(() => {
    if (!isDialogOpen) {
      setAction('')
    }
  }, [isDialogOpen])

  if (!address || !isConnected)
    return (
      <Button
        onClick={async () => {
          await open()
          setIsDialogOpen(true)
        }}
        className="gradient-button">
        {ctaText}
      </Button>
    )
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-button">{ctaText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Trade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="bg-muted rounded-md flex items-center gap-3 p-3">
            <div className="relative h-12 w-12 rounded-full overflow-clip border-accent border-2">
              <Image
                src={data?.photo || '/player_image.jpg'}
                className="mr-2 object-contain"
                fill
                alt=""
              />
            </div>
            <div>
              <p className="text-accent-dark font-semibold">{data?.name}</p>
              <div className="flex text-sm font-medium gap-1 text-black/50">
                <p>{data?.team}</p>
                <p>.</p>
                <p>{data?.position}</p>
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-sm uppercase text-right">Price</p>
              <p className="text-accent font-semibold">${data?.price}</p>
            </div>
          </div>
          {action ? (
            <BuySell
              {...{
                action,
                data,
                balance,
                setIsDialogOpen,
                setRefresh,
                setAction,
                balanceUsdc
              }}
            />
          ) : (
            <div className="flex flex-col gap-4 py-5 items-center justify-center">
              <div className="flex text-sm border rounded-full px-2 w-fit">
                <p className="font-thin">Current Balance: </p>
                <p className="font-semibold ml-2">
                  {parseFloat(ethers.formatEther(balance?.toString())).toFixed(
                    3
                  )}
                </p>
              </div>
              <div className="flex gap-5">
                <Button className="w-[100px]" onClick={() => setAction('buy')}>
                  Buy
                </Button>
                <Button className="w-[100px]" onClick={() => setAction('sell')}>
                  Sell
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TradeButton

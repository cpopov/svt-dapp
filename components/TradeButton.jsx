'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { BookmarkIcon, CheckIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useAccount } from 'wagmi'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import playerTokenAbi from '@/lib/abi/playerTokenAbi'
import { ethers } from 'ethers'
import { readContract } from '@wagmi/core'
import { config } from '@/lib/wagmi/config'
import {
  buyToken,
  sellToken,
  approve,
  approvePlayerToken
} from '@/lib/contract-utils'
import { Loader2 } from 'lucide-react'

function TradeButton({ data, ctaText = 'Trade' }) {
  const { address, isConnected } = useAccount()
  const [action, setAction] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [balance, setBalance] = useState(0)
  const [refresh, setRefresh] = useState(new Date())
  const { open } = useWeb3Modal()

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (ethers.isAddress(data.tokenAddr)) {
          return await readContract(config, {
            abi: playerTokenAbi,
            address: data.tokenAddr,
            functionName: 'balanceOf',
            args: [address]
          })
        } else {
          return 0
        }
      } catch (error) {
        throw error
      }
    }
    getBalance().then(bal => {
      setBalance(bal)
    })
  }, [data, address, refresh])

  // Reset action when dialog closed
  useEffect(() => {
    if (!isDialogOpen) {
      setAction('')
    }
  }, [isDialogOpen])

  if (!address || !isConnected)
    return (
      <Button onClick={() => open()} className="gradient-button">
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
                src="/player_image.png"
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
            <BuySellTab
              {...{ action, data, balance, setIsDialogOpen, setRefresh }}
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

const FormSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be positive.')
    .min(0.01, 'Minimum amount is 0.01.')
})
const BuySellTab = ({
  action = 'buy',
  data,
  balance,
  setIsDialogOpen,
  setRefresh
}) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const { toast } = useToast()
  const { address } = useAccount()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onChange' // This will make validation run on every change
  })

  const onSubmit = async (rowData, action) => {
    setIsSubmit(true)
    try {
      if (action === 'buy') {
        await approve(data.issuerAddr, rowData.amount)
        await buyToken(rowData.amount, data.issuerAddr)
      } else {
        await approvePlayerToken(
          data.tokenAddr,
          data.issuerAddr,
          rowData.amount
        )
        await sellToken(rowData.amount, data.issuerAddr)
      }
      setIsDialogOpen(false)
      setRefresh(new Date())
      toast({
        title: `Transaction successfully completed!`
      })
    } catch (error) {
      console.log(error)
    }
    setIsSubmit(false)
  }

  const tokenCount = Number(form.watch('amount') || 0) / data.price
  const estimatedAmount = (
    Number(form.watch('amount') || 0) * data.price
  ).toFixed(2)

  return (
    <Tabs defaultValue={action} className="w-full md:px-10">
      <TabsList className="grid w-fit grid-cols-2 mx-auto">
        <TabsTrigger className="w-[80px] px-3" value="buy">
          Buy
        </TabsTrigger>
        <TabsTrigger className="w-[80px] px-3" value="sell">
          Sell
        </TabsTrigger>
      </TabsList>
      <Form {...form}>
        <TabsContent value="buy">
          <form
            onSubmit={form.handleSubmit(data => onSubmit(data, 'buy'))}
            className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-accent">
                    {tokenCount} Tokens
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!form.formState.isValid || isSubmit}
              className="w-full"
              type="submit">
              {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Buy
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="sell">
          <form
            onSubmit={form.handleSubmit(data => onSubmit(data, 'sell'))}
            className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter amount of tokens</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-accent">
                    $ {estimatedAmount}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">Current Balance:</p>{' '}
              <p className="font-semibold ml-2">
                {parseFloat(ethers.formatEther(balance?.toString())).toFixed(3)}
              </p>
            </div>
            <Button
              disabled={!form.formState.isValid || isSubmit}
              className="w-full"
              type="submit">
              {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sell
            </Button>
          </form>
        </TabsContent>
      </Form>
    </Tabs>
  )
}

'use client'

import { BookmarkIcon, CheckIcon } from '@radix-ui/react-icons'
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
import {
  buyTokenWithSign,
  sellTokenWithSign,
  readEstimate
} from '@/lib/contract-utils'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { config } from '@/lib/wagmi/config'
import { ethers } from 'ethers'
import { getTimestampInSeconds } from '@/lib/utils'
import playerTokenAbi from '@/lib/abi/playerTokenAbi'
import { readContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { useChainId } from 'wagmi'
import { useEthersSigner } from '@/lib/clientToSigner'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
    if (isConnected) {
      getBalance().then(bal => {
        setBalance(bal)
      })
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
                src={data?.photo || '/player_image.png'}
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
  const [estimateBuyAmount, setEstimateBuyAmount] = useState(0)
  const [estimateSellAmount, setEstimateSellAmount] = useState(0)
  const [isfetch, setIsfetch] = useState(false)
  const { toast } = useToast()
  const { address } = useAccount()
  const chainId = useChainId()
  const signer = useEthersSigner({ chainId })

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onChange' // This will make validation run on every change
  })

  const onSubmit = async (rowData, action) => {
    setIsSubmit(true)

    try {
      const deadline = getTimestampInSeconds() + 5000
      if (action === 'buy') {
        await buyTokenWithSign(
          signer,
          address,
          data.issuerAddr,
          rowData.amount,
          deadline
        )
      } else {
        await sellTokenWithSign(
          signer,
          address,
          data.issuerAddr,
          rowData.amount,
          deadline,
          data.tokenAddr
        )
      }

      setIsDialogOpen(false)
      setRefresh(new Date())
      toast({
        title: `Transaction successfully completed!`
      })
    } catch (error) {
      if (error.message.includes('EnforcedPause')) {
        toast({
          variant: 'destructive',
          title: 'Action  paused in the contract!',
          description: 'This contract is paused at the moment'
        })
      } else {
        console.log('error', error.messages)
      }
    }
    setIsSubmit(false)
  }

  useEffect(() => {
    const amount = Number(form.watch('amount') || 0)
    if (amount > 0) {
      setIsfetch(true)
      readEstimate(amount, data.issuerAddr)
        .then(values => {
          setEstimateBuyAmount(values.previewBuy.toString())
          setEstimateSellAmount(values.previewSell.toString())
          setIsfetch(false)
        })
        .catch(e => {
          setEstimateBuyAmount(0)
          setEstimateSellAmount(0)
          setIsfetch(false)
        })
    } else {
      setEstimateBuyAmount(0)
    }
  }, [form.watch('amount')])

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
            className="space-y-6"
            onSubmit={form.handleSubmit(data => onSubmit(data, 'buy'))}>
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
                    {estimateBuyAmount > 0 && (
                      <span>
                        You will get{' '}
                        {isfetch ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                        ) : (
                          <b>{estimateBuyAmount}</b>
                        )}{' '}
                        (estimated) {data.name} tokens
                      </span>
                    )}
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
                    {estimateSellAmount > 0 && (
                      <span>
                        You will get{' '}
                        {isfetch ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                        ) : (
                          <b>{estimateSellAmount}</b>
                        )}{' '}
                        (estimated) USDC
                      </span>
                    )}
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

'use client'

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
  readEstimate,
  formatUSDC,
  formatToken,
  usdcAddress
} from '@/lib/contract-utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { ethers } from 'ethers'
import { getTimestampInSeconds } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { useChainId } from 'wagmi'
import { useEthersSigner } from '@/lib/clientToSigner'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const BuySell = ({
  action = 'buy',
  data,
  balance,
  balanceUsdc,
  setIsDialogOpen,
  setRefresh,
  setAction
}) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isError, setIsError] = useState(false)
  const [estimateBuyAmount, setEstimateBuyAmount] = useState(0)
  const [estimateSellAmount, setEstimateSellAmount] = useState(0)
  const [isfetch, setIsfetch] = useState(false)
  const { toast } = useToast()
  const { address } = useAccount()
  const chainId = useChainId()
  const signer = useEthersSigner({ chainId })

  const FormSchema = z.object({
    amount: z
      .number()
      .positive('Amount must be positive.')
      .min(0.01, 'Minimum amount is 0.01.')
  })
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
          deadline,
          chainId
        )
      } else {
        await sellTokenWithSign(
          signer,
          address,
          data.issuerAddr,
          rowData.amount,
          deadline,
          data.tokenAddr,
          chainId
        )
      }

      setIsDialogOpen(false)
      setRefresh(new Date())
      toast({
        title: `Transaction successfully completed!`
      })
    } catch (error) {
      console.log(error.message)

      if (error.message.includes('EnforcedPause')) {
        toast({
          variant: 'destructive',
          title: 'Action  paused in the contract!',
          description: 'This contract is paused at the moment'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong! Please try again',
          description: `${error.message.slice(0, 100)}...`
        })
      }
    }
    setIsSubmit(false)
  }

  useEffect(() => {
    const amount = Number(form.watch('amount') || 0)

    if (amount > 0) {
      setIsfetch(true)
      readEstimate(amount, data.issuerAddr, chainId)
        .then(values => {
          setEstimateBuyAmount(
            parseFloat(formatToken(values.previewBuy?.toString())).toFixed(3)
          )
          if (values.previewSell) {
            setEstimateSellAmount(
              parseFloat(formatUSDC(values.previewSell, chainId)).toFixed(3)
            )
          } else {
            setEstimateSellAmount(0)
          }
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

  useEffect(() => {
    const amount = Number(form.watch('amount') || 0)

    const formattedBalance =
<<<<<<< HEAD
      action === 'buy' ? formatEth(balanceUsdc) : ethers.formatEther(balance)
=======
      action === 'buy'
        ? ethers.formatEther(balanceUsdc?.toString())
        : formatUSDC(balance)
>>>>>>> 0fa49caba419ccce79542ab844806777a66b8eec

    const sellError = amount > parseFloat(formattedBalance) ? true : false
    const buyError = amount > parseFloat(formattedBalance) ? true : false

    if (action === 'buy') {
      setIsError(buyError)
    } else {
      setIsError(sellError)
    }
  }, [form.watch('amount'), balance])

  return (
    <Tabs
      defaultValue={action}
      className="w-full md:px-10"
      onValueChange={value => setAction(value)}>
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
                  <FormLabel>Enter amount of USDC</FormLabel>
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
                    {estimateBuyAmount === 0 && isfetch && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">USDC Balance:</p>{' '}
              <p className="font-semibold ml-2">
                {parseFloat(formatEth(balanceUsdc?.toString())).toFixed(2)}
              </p>
            </div>

            <Button
              disabled={!form.formState.isValid || isSubmit || isError}
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
                    {estimateSellAmount === 0 && isfetch && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">Token Balance:</p>{' '}
              <p className="font-semibold ml-2">
                {parseFloat(ethers.formatEther(balance?.toString())).toFixed(2)}
              </p>
            </div>
            <Button
              disabled={!form.formState.isValid || isSubmit || isError}
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

export default BuySell

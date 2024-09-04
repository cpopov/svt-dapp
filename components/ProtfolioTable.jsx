'use client'

import React, { useEffect, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'

import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import Ticker from './Ticker'
import TradeButton from './TradeButton'
import { getUserPortfolio } from '@/actions'
import { loadPlayers } from '@/lib/players'

const PortfolioTable = () => {
  const chainId = useChainId()
  // const players = loadPlayers(chainId)
  const [players, setPlayers] = useState(null)
  const { address } = useAccount()

  useEffect(() => {
    async function fetchPosts() {
      try {
        let { data } = await getUserPortfolio(address)
        setPlayers(data?.tokens)
      } catch (error) {
        setPlayers([])
      }
    }
    fetchPosts()
  }, [])

  if (!players) return <Loader />
  if (players?.length === 0) return <ErrorMessage />

  return (
    <TableWrapper players={players}>
      <div className="divide-y-[1px] border shadow-md">
        {players.map((player, index) => (
          <PlayerRow key={index} player={player} />
        ))}
      </div>
    </TableWrapper>
  )
}

const TableWrapper = ({ children, players }) => (
  <div className="py-5 w-full md:px-24">
    <h5>{`Portfolio: ${players?.length || 0} players`}</h5>
    <div className="overflow-scroll scrollbar-hide">
      <div className="grid grid-cols-8 px-5 py-3 min-w-[900px] bg-[#DDEDE7] mt-10">
        <div className={`min-w-[150px] col-span-1 flex gap-1 items-center`}>
          <p className="text-sm font-semibold uppercase">My Tokens</p>
          <Ticker />
        </div>
        <RowTitle text="Player" colSpan={2} />
        <RowTitle text="Symbol" />
        <RowTitle text="Team" />
        <RowTitle text="Position" />
        <div className={`min-w-[150px] col-span-1 flex gap-1 items-center`}>
          <p className="text-sm font-semibold uppercase">Price</p>
          <Ticker />
        </div>
        <RowTitle text="Action" />
      </div>
      {children}
    </div>
  </div>
)

const RowTitle = ({ text, colSpan = 1 }) => (
  <div className={`min-w-[150px] col-span-${colSpan}`}>
    <p className="text-sm font-semibold uppercase">{text}</p>
  </div>
)

const PlayerRow = ({ player, ...props }) => (
  <div
    {...props}
    className="py-3 px-5 items-center min-w-[900px] group bg-white hover:bg-secondary">
    <div className="grid grid-cols-8">
      <div className="min-w-[150px] col-span-1 flex items-center">
        <p className="text-sm group-hover:text-accent font-semibold">
          {Number(player?.amount)?.toFixed(4)}
        </p>
        <p className="text-xs pl-1"></p>
      </div>
      <div className="min-w-[150px] col-span-2 flex items-center">
        <div className="relative h-10 w-10 mr-2 rounded-full overflow-clip group-hover:border-accent border">
          <Image
            src={player.photo || '/player_image.jpg'}
            className="mr-2 object-contain"
            fill
            alt=""
          />
        </div>
        <p className="text-sm group-hover:text-accent font-semibold">
          {player.name}
        </p>
      </div>
      <PlayerCell text={player.symbol} />
      <PlayerCell text={player.team} />
      <PlayerCell text={player.position} />
      <PlayerCell text={`$ ${player.price}`} />
      <div className="min-w-[150px]">
        <TradeButton data={player} className="group-hover:hover" />
      </div>
    </div>
  </div>
)

const PlayerCell = ({ text, colSpan = 1, className = '' }) => (
  <div className={`min-w-[150px] col-span-${colSpan} flex items-center`}>
    <p className={`text-sm font-medium ${className}`}>{text}</p>
  </div>
)

function Loader({ length = 1 }) {
  return (
    <TableWrapper>
      <div className="divide-y-2">
        {[...Array(length)].map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton className="w-full h-20 flex items-center justify-center">
              Loading...
            </Skeleton>
          </React.Fragment>
        ))}
      </div>
    </TableWrapper>
  )
}

function ErrorMessage() {
  return (
    <TableWrapper>
      <div className="h-20 rounded-md flex w-full justify-center items-center">
        <p>No players found</p>
      </div>
    </TableWrapper>
  )
}

export default PortfolioTable

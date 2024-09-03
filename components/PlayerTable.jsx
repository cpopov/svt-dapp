'use client'

import Image from 'next/image'
import React from 'react'
import { Skeleton } from './ui/skeleton'
import TradeButton from './TradeButton'
import { loadPlayers } from '@/lib/players'
import { useChainId } from 'wagmi'

const PlayerTable = ({ players = [] }) => {
  const chainId = useChainId()
  // const players = loadPlayers(chainId)
  if (players.length)
    return (
      <TableWrapper>
        <div className="divide-y-[1px] border shadow-md">
          {players.map((player, index) => (
            <PlayerRow key={index} player={player} />
          ))}
        </div>
      </TableWrapper>
    )
  return <ErrorMessage />
}

const TableWrapper = ({ children }) => (
  <div className="py-5 w-full md:px-24">
    <h5>Players market</h5>
    <div className="overflow-scroll scrollbar-hide">
      <div className="grid grid-cols-7 px-5 py-3 min-w-[900px] bg-[#DDEDE7] mt-10">
        <RowTitle text="Player" colSpan={2} />
        <RowTitle text="Symbol" />
        <RowTitle text="Team" />
        <RowTitle text="Position" />
        <RowTitle text="Price" />
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
    <div className="grid grid-cols-7">
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

function Loader({ length = 3 }) {
  return (
    <TableWrapper>
      {[...Array(length)].map((_, index) => (
        <React.Fragment key={index}>
          <Skeleton className="w-full h-20" />
        </React.Fragment>
      ))}
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

export default PlayerTable

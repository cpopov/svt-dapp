'use client'

import Image from 'next/image'
import React from 'react'
import Ticker from './Ticker'
import TradeButton from './TradeButton'

const PortfolioTable = () => {
  const players = [
    {
      name: 'P Foden',
      symbol: 'PFOD',
      team: 'Manchester City',
      position: 'Midfielder',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '4821'
    },
    {
      name: 'B Fernandes',
      symbol: 'BFER',
      team: 'Manchester United',
      position: 'Midfielder',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '7693'
    },
    {
      name: 'T Arnold',
      symbol: 'TARN',
      team: 'Liverpool',
      position: 'Defender',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '3245'
    },
    {
      name: 'Rodri',
      symbol: 'RODR',
      team: 'Manchester City',
      position: 'Midfielder',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '1947'
    },
    {
      name: 'L Diaz',
      symbol: 'DIAZ',
      team: 'Liverpool',
      position: 'Forward',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '8362'
    },
    {
      name: 'A Allister',
      symbol: 'AALL',
      team: 'Liverpool',
      position: 'Midfielder',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '5738'
    },
    {
      name: 'O Watkins',
      symbol: 'OWAT',
      team: 'Aston Villa',
      position: 'Forward',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '2596'
    },
    {
      name: 'P Porro',
      symbol: 'PPOR',
      team: 'Totenham',
      position: 'Defender',
      photo: '',
      tokenAddr: '0x0',
      issuerAddr: '0x0',
      price: '0.1',
      userToken: '4160'
    }
  ]

  return (
    <TableWrapper>
      <div className="divide-y-[1px] border shadow-md">
        {players.map((player, index) => (
          <PlayerRow key={index} player={player} />
        ))}
      </div>
    </TableWrapper>
  )
}

const TableWrapper = ({ children }) => (
  <div className="py-5">
    <h5>Portfolio: 4 players</h5>
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
          {player?.userToken}
        </p>
        <p className="text-xs pl-1">SVC</p>
      </div>
      <div className="min-w-[150px] col-span-2 flex items-center">
        <div className="relative h-10 w-10 mr-2 rounded-full overflow-clip group-hover:border-accent border">
          <Image
            src={player.photo || '/player_image.png'}
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

export default PortfolioTable

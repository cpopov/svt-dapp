'use client'

import { useEffect, useState } from 'react'

import Filter from '@/components/Filter'
import PlayerTable from '@/components/PlayerTable'
import { getPlayersList } from '@/actions'

export default function Home() {
  const [players, setPlayers] = useState([])
  const [sortBy, setSortBy] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await getPlayersList({
        sort: sortBy,
        dir: sortDirection
      })
      setPlayers(data)
    }
    fetchPlayers()
  }, [sortBy, sortDirection])

  const handleSort = criteria => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(criteria)
      setSortDirection('asc')
    }
  }

  return (
    <main className="flex min-h-screen flex-col py-24 container">
      <div className="py-5 flex justify-between">
        <h5>{`Players market`}</h5>
        <div>
          <Filter />
        </div>
      </div>
      <PlayerTable
        players={players}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </main>
  )
}

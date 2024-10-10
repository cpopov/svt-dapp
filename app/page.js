'use client'

import { useEffect, useState } from 'react'

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
    <main className="flex min-h-screen flex-col items-center justify-between py-24 container">
      <PlayerTable
        players={players}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </main>
  )
}

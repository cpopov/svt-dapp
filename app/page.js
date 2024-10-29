'use client'

import { useEffect, useState } from 'react'

import { ChevronDown } from 'lucide-react'
import Filter from '@/components/Filter'
import PlayerTable from '@/components/PlayerTable'
import SearchBox from '@/components/SearchBox'
import SportFilter from '@/components/ui/SportFilter'
import { getPlayersList } from '@/actions'

export default function Home() {
  const [players, setPlayers] = useState([])
  const [sortBy, setSortBy] = useState('name')
  const [sport, setSport] = useState('football')
  const [sortDirection, setSortDirection] = useState('asc')
  const [search, setSearch] = useState('')
  const [selectedLeague, setSelectedLeague] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [pageSize, setPageSize] = useState(10) // Default page size
  const [page, setPage] = useState(1) // Default to first page

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await getPlayersList({
        league: selectedLeague,
        team: selectedTeam,
        country: selectedCountry,
        search,
        sport,
        sort: sortBy,
        dir: sortDirection,
        pageSize,
        page
      })
      setPlayers(data)
    }
    fetchPlayers()
  }, [
    sortBy,
    sortDirection,
    search,
    selectedLeague,
    selectedTeam,
    selectedCountry,
    pageSize,
    page,
    sport
  ])

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
      <div className="py-5 flex flex-col md:flex-row gap-5 justify-between">
        <SportFilter {...{ sport, setSport }}>
          <div className="flex gap-1 items-center">
            <h5 className="text-left">
              <span className="capitalize">{`${sport} `}</span>market
            </h5>
            <ChevronDown />
          </div>
        </SportFilter>
        <div className="flex flex-wrap gap-5">
          <Filter
            {...{ setSelectedLeague, setSelectedTeam, setSelectedCountry }}
          />
          <SearchBox timeOut={400} setSearch={setSearch} />
        </div>
      </div>
      <PlayerTable
        players={players}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      {/* Pagination Controls */}
      {/* <div className="flex justify-between items-center mt-4">
        <button
          className="btn"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button className="btn" onClick={() => setPage(prev => prev + 1)}>
          Next
        </button>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="border rounded px-2 py-1">
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div> */}
    </main>
  )
}

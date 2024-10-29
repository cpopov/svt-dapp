'use client'

import { ChevronDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import Filter from '@/components/Filter'
import PaginationComp from '@/components/PaginationComp'
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
  const [totalPages, setTotalPages] = useState(5) // Default to 10 page

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
    try {
      fetchPlayers()
    } catch (error) {
      console.log(error)
    }
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
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex gap-2 flex-wrap">
            <FilterBadge filter={selectedLeague} action={setSelectedLeague} />
            <FilterBadge filter={selectedTeam} action={setSelectedTeam} />
            <FilterBadge filter={selectedCountry} action={setSelectedCountry} />
          </div>
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
      <PaginationComp {...{ totalPages, page, setPage }} />
    </main>
  )
}
const FilterBadge = ({ filter, action = () => {} }) => {
  return filter ? (
    <Badge
      className="rounded-full border-accent text-accent bg-[#EBEDF0] w-fit h-fit text-sm font-medium flex items-center"
      variant="outline">
      {filter}
      <X
        role="button"
        className="stroke-[4px] ml-1"
        size={12}
        onClick={() => {
          action('')
        }}
      />
    </Badge>
  ) : null
}

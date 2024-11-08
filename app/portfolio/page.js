'use client'

import { useEffect, useState } from 'react'

import { ChevronDown } from 'lucide-react'
import Filter from '@/components/Filter'
import FilterBadge from '@/components/FilterBadge'
import PortfolioTable from '@/components/PortfolioTable'
import SearchBox from '@/components/SearchBox'
import SportFilter from '@/components/ui/SportFilter'
import { getUserPortfolio } from '@/actions'
import { useAccount } from 'wagmi'

export default function Home() {
  const [players, setPlayers] = useState([])
  const [sortBy, setSortBy] = useState('name')
  const [sport, setSport] = useState('football')
  const [sortDirection, setSortDirection] = useState('asc')
  const [search, setSearch] = useState('')
  const [selectedLeague, setSelectedLeague] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const { address } = useAccount()
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await getUserPortfolio({
        address,
        league: selectedLeague,
        team: selectedTeam,
        country: selectedCountry,
        search,
        sport,
        sort: sortBy,
        dir: sortDirection
      })
      setPlayers(data?.tokens)
    }
    try {
      fetchPlayers()
    } catch (error) {
      console.log(error)
    }
  }, [
    sortBy,
    address,
    sortDirection,
    search,
    sport,
    selectedLeague,
    selectedTeam,
    selectedCountry
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
    <main className="flex min-h-screen flex-col md:py-24 py-16">
      <div className="py-5 flex flex-col md:flex-row gap-5 justify-between container">
        {/* <h5>{`Portfolio: ${players?.length || 0} players`}</h5> */}
        <SportFilter {...{ sport, setSport }}>
          <div className="flex gap-1 items-center">
            <h5 className="text-left">
              <span className="capitalize">{`${sport} `}</span>market
            </h5>
            <ChevronDown />
          </div>
        </SportFilter>
        <div className="flex flex-wrap items-center gap-4">
          <div className="hidden md:flex gap-2 flex-wrap">
            <FilterBadge filter={selectedLeague} action={setSelectedLeague} />
            <FilterBadge filter={selectedTeam} action={setSelectedTeam} />
            <FilterBadge filter={selectedCountry} action={setSelectedCountry} />
          </div>
          <Filter
            {...{
              selectedCountry,
              selectedTeam,
              selectedLeague,
              setSelectedLeague,
              setSelectedTeam,
              setSelectedCountry
            }}
          />
          <div className="flex gap-2 flex-wrap md:hidden">
            <FilterBadge filter={selectedLeague} action={setSelectedLeague} />
            <FilterBadge filter={selectedTeam} action={setSelectedTeam} />
            <FilterBadge filter={selectedCountry} action={setSelectedCountry} />
          </div>
          <SearchBox timeOut={400} setSearch={setSearch} />
        </div>
      </div>
      <PortfolioTable
        players={players}
        onSort={handleSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
      {/* <PaginationComp {...{ totalPages, page, setPage }} /> */}
    </main>
  )
}

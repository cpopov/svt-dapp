'use client'

import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import Filter from '@/components/Filter'
import PortfolioTable from '@/components/PortfolioTable'
import SearchBox from '@/components/SearchBox'
import { X } from 'lucide-react'
import { getUserPortfolio } from '@/actions'
import { useAccount } from 'wagmi'

export default function Home() {
  const [players, setPlayers] = useState([])
  const [sortBy, setSortBy] = useState('name')
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
    <main className="flex min-h-screen flex-col py-24 container">
      <div className="py-5 flex flex-col md:flex-row gap-5 justify-between">
        <h5>{`Portfolio: ${players?.length || 0} players`}</h5>
        <div className="flex flex-wrap items-center gap-5">
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

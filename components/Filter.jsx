import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { countries, leagues, teams } from '@/lib/constants'

import { Button } from './ui/button'
import { Label } from './ui/label'
import { PopoverClose } from '@radix-ui/react-popover'
import { X } from 'lucide-react'

function Filter({
  setSelectedLeague = () => {},
  setSelectedTeam = () => {},
  setSelectedCountry = () => {}
}) {
  const [league, setLeague] = useState('')
  const [team, setTeam] = useState('')
  const [country, setCountry] = useState('')
  const closeRef = useRef(null)
  // Sample data for dropdowns
  const setFilters = () => {
    setSelectedLeague(league)
    setSelectedTeam(team)
    setSelectedCountry(country)
  }
  const resetFilters = () => {
    setSelectedLeague('')
    setSelectedTeam('')
    setSelectedCountry('')
    closeRef?.current?.click()
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="uppercase flex items-center gap-1">
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 2H2L10 11.46V18L14 20V11.46L22 2Z"
              stroke="#47A847"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm font-medium">Filter</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Filter players</p>
            <PopoverClose ref={closeRef}>
              <X size={20} className="text-accent" />
            </PopoverClose>
          </div>
          {/* League Filter */}
          <div>
            <Label className="font-light mb-2">League</Label>
            <Select onValueChange={setLeague}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select League" />
              </SelectTrigger>
              <SelectContent>
                {leagues.map(league => (
                  <SelectItem key={league} value={league}>
                    {league}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Filter */}
          <div>
            <Label className="font-light mb-2">Team</Label>
            <Select onValueChange={setTeam}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map(team => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country Filter */}
          <div>
            <Label className="font-light mb-2">Country</Label>
            <Select onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={resetFilters}>
              Cancel
            </Button>
            <Button className="gradient-button" onClick={setFilters}>
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Filter

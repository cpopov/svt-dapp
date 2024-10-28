import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Label } from './ui/label'

function Filter() {
  // Sample data for dropdowns
  const leagues = ['Premier League', 'La Liga', 'Serie A']
  const teams = ['Team A', 'Team B', 'Team C']
  const countries = ['USA', 'Spain', 'Italy']

  // State for each filter
  const [selectedLeague, setSelectedLeague] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

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
          <p className="text font-medium">Filter players</p>

          {/* League Filter */}
          <div>
            <Label className="font-light mb-2">League</Label>
            <Select onValueChange={setSelectedLeague}>
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
            <Select onValueChange={setSelectedTeam}>
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
            <Select onValueChange={setSelectedCountry}>
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
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Filter

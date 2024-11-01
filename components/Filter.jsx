'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useEffect, useRef, useState } from 'react'

import { Button } from './ui/button'
import { Label } from './ui/label'
import { PopoverClose } from '@radix-ui/react-popover'
import { X } from 'lucide-react'
import useFetchFilterData from '@/lib/hooks/useFetchFilterData'

function Filter({
  sport = 'football',
  setSelectedLeague = () => {},
  setSelectedTeam = () => {},
  setSelectedCountry = () => {},
  selectedCountry = '',
  selectedTeam = '',
  selectedLeague = ''
}) {
  const [league, setLeague] = useState(selectedLeague)
  const [team, setTeam] = useState(selectedTeam)
  const [country, setCountry] = useState(selectedCountry)
  const closeRef = useRef(null)
  // const drawerCloseRef = useRef(null)
  const { data, loading, error } = useFetchFilterData(sport)
  useEffect(() => {
    setLeague(selectedLeague)
    setTeam(selectedTeam)
    setCountry(selectedCountry)
  }, [selectedLeague, selectedTeam, selectedCountry])

  const setFilters = () => {
    setSelectedLeague(league)
    setSelectedTeam(team)
    setSelectedCountry(country)
  }

  const resetFilters = () => {
    setSelectedLeague('')
    setSelectedTeam('')
    setSelectedCountry('')
    setTeam('')
    setCountry('')
    setLeague('')
    closeRef?.current?.click()
    // drawerCloseRef?.current?.click()
  }
  if (!data || error) return null
  return (
    <>
      <Popover className="md:block hidden">
        <PopoverTrigger className="md:block hidden">
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
            {data?.leagues.length ? (
              <div>
                <Label className="font-light mb-2">League</Label>
                <Select onValueChange={setLeague} value={league}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      defaultValue={league}
                      placeholder="Select League"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.leagues?.map(league => (
                      <SelectItem key={league} value={league}>
                        {league}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
            {/* Team Filter */}
            {data?.teams?.length ? (
              <div>
                <Label className="font-light mb-2">Team</Label>
                <Select onValueChange={setTeam} value={team}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      defaultValue={team}
                      placeholder="Select Team"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.teams?.map(team => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
            {/* Country Filter */}
            {data?.countries?.length ? (
              <div>
                <Label className="font-light mb-2">Country</Label>
                <Select onValueChange={setCountry} value={country}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      defaultValue={country}
                      placeholder="Select Country"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.countries?.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
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
      <Drawer className="md:hidden">
        <DrawerTrigger className="md:hidden">
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
        </DrawerTrigger>
        <DrawerTitle className="hidden">
          <span className="sr-only">Sports filter</span>
        </DrawerTitle>
        <DrawerContent className="py-0 px-4">
          <DrawerTitle className="pb-3">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Filter players</p>
              <DrawerClose asChild>
                <X role="button" size={20} className="text-accent" />
              </DrawerClose>
            </div>
          </DrawerTitle>
          {data?.leagues.length ? (
            <div>
              <Label className="font-light mb-2">League</Label>
              <Select onValueChange={setLeague} value={league}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    defaultValue={league}
                    placeholder="Select League"
                  />
                </SelectTrigger>
                <SelectContent>
                  {data?.leagues?.map(league => (
                    <SelectItem key={league} value={league}>
                      {league}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
          {/* Team Filter */}
          {data?.teams?.length ? (
            <div>
              <Label className="font-light mb-2">Team</Label>
              <Select onValueChange={setTeam} value={team}>
                <SelectTrigger className="w-full">
                  <SelectValue defaultValue={team} placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  {data?.teams?.map(team => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
          {/* Country Filter */}
          {data?.countries?.length ? (
            <div>
              <Label className="font-light mb-2">Country</Label>
              <Select onValueChange={setCountry} value={country}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    defaultValue={country}
                    placeholder="Select Country"
                  />
                </SelectTrigger>
                <SelectContent>
                  {data?.countries?.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              onClick={() => {
                resetFilters()
              }}>
              Cancel
            </Button>
            <Button className="gradient-button" onClick={setFilters}>
              Apply Filter
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Filter

import { useEffect, useState } from 'react'

import { getSportFilters } from '@/actions'

const useFetchFilterData = sport => {
  const [data, setData] = useState({
    teams: [],
    leagues: [],
    countries: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sport) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const [teamsResponse, leaguesResponse, countriesResponse] =
          await Promise.all([
            getSportFilters({ sport, item: 'teams' }),
            getSportFilters({ sport, item: 'leagues' }),
            getSportFilters({ sport, item: 'countries' })
          ])
        setData({
          teams: teamsResponse.data,
          leagues: leaguesResponse.data,
          countries: countriesResponse.data
        })
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sport])

  return { data, loading, error }
}

export default useFetchFilterData

import instance from './axios'

const http = instance()

/**
 * Get the list of players
 * @param sort one of 'name', 'team', 'price'
 * @param dir one of 'asc' or 'desc'
 * @returns {Promise<axios.AxiosResponse<any>>}
 * TODO: filters and search. See docs for more info
 */
export const getPlayersList = ({
  search,
  league,
  team,
  country,
  sort,
  dir,
  page,
  sport,
  pageSize
}) =>
  http.get(
    `/tokens/${sport}?search=${search}&country=${country}&league=${league}&team=${team}&sort=${sort}&dir=${dir}&page=${page}&pageSize=${pageSize}`
  )

/**
 * Get the player details
 * @param address token address
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserPortfolio = ({
  address,
  search,
  league,
  team,
  country,
  sort,
  sport,
  dir
}) =>
  http.get(
    `/portfolio/${address}?market=${sport}&search=${search}&country=${country}&league=${league}&team=${team}&sort=${sort}&dir=${dir}`
  )
export const getSportFilters = ({ sport, item }) =>
  http.get(`/markets/${sport}/${item}`)

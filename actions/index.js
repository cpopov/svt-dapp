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
  pageSize
}) =>
  http.get(
    `/tokens/football?search=${search}&country=${country}&league=${league}&team=${team}&sort=${sort}&dir=${dir}&page=${page}&pageSize=${pageSize}`
  )

/**
 * Get the player details
 * @param address token address
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserPortfolio = address => http.get(`/portfolio/${address}`)

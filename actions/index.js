import instance from './axios'

const http = instance()

/**
 * Get the list of players
 * @param sort one of 'name', 'team', 'price'
 * @param dir one of 'asc' or 'desc'
 * @returns {Promise<axios.AxiosResponse<any>>}
 * TODO: filters and search. See docs for more info
 */
export const getPlayersList = ({ sort, dir }) =>
  http.get(`/tokens/football?sort=${sort}&dir=${dir}`)

/**
 * Get the player details
 * @param address token address
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserPortfolio = address => http.get(`/portfolio/${address}`)

import instance from './axios'

const http = instance()

export const getPlayersList = ({ sort, dir }) =>
  http.get(`/market?sort=${sort}&dir=${dir}`)
export const getUserPortfolio = address => http.get(`/portfolio/${address}`)

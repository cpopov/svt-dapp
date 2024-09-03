import instance from './axios'

const http = instance()

export const getPlayersList = () => http.get(`/market`)
export const getUserPortfolio = address => http.get(`/portfolio/${address}`)

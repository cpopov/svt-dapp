import instance from './axios'

const http = instance()

export const getPlayersList = () => http.get('/market')

import axios from 'axios'

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'Content-type': 'application/json'
    }
  })

  return axiosInstance
}

export default instance

import React, { useEffect, useState } from 'react'

import { Input } from './ui/input'

function SearchBox({ setSearch = () => {}, timeOut = 1000 }) {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchTerm)
    }, timeOut) // 300ms delay, adjust as needed

    // Cleanup the timeout if the search term changes within the delay
    return () => clearTimeout(handler)
  }, [searchTerm])

  return (
    <div className="relative">
      <div className="absolute left-2 top-0 bottom-0 my-auto h-fit">
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.1718 19.253L14.4845 14.2806C15.6901 12.8217 16.3509 10.975 16.3501 9.06711C16.3475 6.91711 15.5089 4.85593 14.0183 3.33565C12.5278 1.81538 10.5068 0.960116 8.39881 0.957458C6.29033 0.960118 4.26899 1.81576 2.77832 3.33663C1.28765 4.8575 0.449405 6.91938 0.44751 9.06985C0.450116 11.2198 1.28868 13.281 2.77927 14.8013C4.26986 16.3216 6.29079 17.1768 8.39881 17.1795C10.0298 17.1839 11.6218 16.6712 12.9546 15.7122L17.6777 20.7221C17.7742 20.825 17.8903 20.9068 18.0188 20.9625C18.1473 21.0183 18.2856 21.0467 18.4252 21.0462C18.6924 21.0463 18.9491 20.9405 19.1414 20.7513C19.2399 20.655 19.3189 20.5399 19.3737 20.4124C19.4286 20.285 19.4583 20.1478 19.4611 20.0086C19.4639 19.8695 19.4398 19.7311 19.3902 19.6015C19.3406 19.4718 19.2664 19.3534 19.1718 19.253ZM8.39881 3.07207C9.9577 3.07376 11.4522 3.7063 12.5543 4.83081C13.6563 5.95533 14.2758 7.47991 14.2768 9.06985C14.2749 10.659 13.6551 12.1825 12.5533 13.3062C11.4516 14.4299 9.95782 15.062 8.3997 15.064C6.84128 15.0625 5.34706 14.4306 4.24491 13.3069C3.14277 12.1831 2.52272 10.6593 2.52083 9.06985C2.52178 7.47991 3.14128 5.95533 4.24333 4.83081C5.34539 3.7063 6.83992 3.07376 8.39881 3.07207Z"
            fill="#099F8C"
            stroke="#099F8C"
          />
        </svg>
      </div>
      <Input
        className="pl-8 placeholder:text-black bg-white rounded-full md:min-w-60"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchBox

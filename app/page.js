import PlayerTable from '@/components/PlayerTable'
import { getPlayersList } from '@/actions'
const getData = async () => {
  try {
    const { data } = await getPlayersList()
    return data
  } catch (error) {
    return []
  }
}
export default async function Home() {
  const players = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 container">
      <PlayerTable {...{ players }} />
    </main>
  )
}

import PlayerTable from '@/components/PlayerTable'
import { getPlayersList } from '@/actions'
const getData = async () => {
  try {
    const { data } = await getPlayersList()
    console.log('getPlayersList(), loaded data:',data)
    return data
  } catch (error) {
    return []
  }
}
export default async function Home() {
  const players = await getData()
  console.log('Home(), loaded players:',players)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 container">
      <PlayerTable {...{ players }} />
    </main>
  )
}

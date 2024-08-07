import PlayerTable from '@/components/PlayerTable'
import TradeButton from '@/components/TradeButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PlayerTable />
    </main>
  )
}

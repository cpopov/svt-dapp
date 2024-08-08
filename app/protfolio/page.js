import PortfolioTable from '@/components/ProtfolioTable'

export const metadata = {
  title: 'Portfolio'
}
export default function Protfolio() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PortfolioTable />
    </main>
  )
}

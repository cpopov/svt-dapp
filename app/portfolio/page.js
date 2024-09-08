import PortfolioTable from '@/components/PortfolioTable'

export const metadata = {
  title: 'Portfolio'
}
export default function Portfolio() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 container">
      <PortfolioTable />
    </main>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import Navigation from './Navigation'

async function Navbar() {
  return (
    <>
      <nav
        className={`md:block hidden absolute top-0 right-0 left-0 m-auto z-50 bg-[#08401A] text-white`}>
        <div className="h-16 flex justify-between items-center container">
          <Link href="/">
            <div className="h-8 w-24 relative">
              <Image
                fill
                alt="logo"
                sizes="auto"
                src="/svt_logo.png"
                className="object-contain"
              />
            </div>
          </Link>
          <Navigation />
        </div>
      </nav>
      <MobileNav />
    </>
  )
}

export default Navbar

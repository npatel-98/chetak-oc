import Head from 'next/head'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import ImageHelper from '../helper/Image'
import { Poppins } from '@next/font/google'
import Breadcrumb from './Breadcrumb'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700', '800', '900'],
})

interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  // const [categories, setCategories] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 150
      const scrollPosition = window.scrollY
      setIsSticky(scrollPosition > headerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // useEffect(() => {
  //   const getCategories = async () => {
  //     if (!categories) {
  //       const res = await Me.ListCategories({ catalogID: 'BAJAJ_Catalog' })
  //       setCategories(res?.Items)
  //     }
  //   }
  //   getCategories()
  // }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Head>
        <title>{'BAJAJ Auto'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={poppins.className}>
        <div className="relative" id="header">
          <header
            className={`header w-full z-50 transition-all duration-300 ${
              isSticky
                ? 'fixed top-0 left-0 right-0 py-3 bg-[#23284a] shadow-lg'
                : 'py-3 bg-[#23284a]'
            }`}
          >
            <div className="header__wrapper flex items-center justify-between container mx-auto px-4">
              <div className="flex items-center gap-12">
                <Link href="/">
                  <div className="cursor-pointer">
                    <ImageHelper
                      key={'headerLogo'}
                      url="https://cdn.bajajauto.com/-/media/assets/bajajauto/global/bajaj-logo2.png"
                    />
                  </div>
                </Link>
                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                  <ul className="flex gap-10 items-center text-white">
                    <li>
                      <Link href="/products" className="!text-white font-semibold hover:underline">
                        Motorcycles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/three-wheelers"
                        className="!text-white font-semibold hover:underline"
                      >
                        3 Wheelers & Qute
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shareholders"
                        className="!text-white font-semibold hover:underline"
                      >
                        Shareholders
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Desktop Buttons */}
              <div className="hidden lg:flex gap-4 items-center">
                <button
                  type="button"
                  className="py-2 px-6 rounded-3xl text-white bg-[#2563eb] font-semibold hover:bg-[#1d4ed8] transition"
                >
                  Enquire Now
                </button>
                <button
                  type="button"
                  className="py-2 px-6 rounded-3xl text-white border border-white font-semibold hover:bg-white hover:text-[#23284a] transition"
                >
                  Visit E-showroom
                </button>
              </div>
              {/* Mobile Menu Button */}

              <button
                onClick={toggleMenu}
                className="lg:hidden text-white text-2xl rotate-90"
                aria-label="Toggle menu"
                key={isMenuOpen ? 'close' : 'open'}
              >
                |||
              </button>
            </div>
          </header>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-[#23284a] z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:hidden`}
          >
            <div className="relative h-full">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-white text-2xl"
                aria-label="Close menu"
              >
                X
              </button>
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <nav className="w-full">
                  <ul className="flex flex-col items-center space-y-6 text-white">
                    <li>
                      <Link
                        href="/products"
                        className="!text-white text-xl font-semibold hover:underline"
                        onClick={toggleMenu}
                      >
                        Motorcycles
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/three-wheelers"
                        className="!text-white text-xl font-semibold hover:underline"
                        onClick={toggleMenu}
                      >
                        3 Wheelers & Qute
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shareholders"
                        className="!text-white text-xl font-semibold hover:underline"
                        onClick={toggleMenu}
                      >
                        Shareholders
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="flex flex-col gap-4 items-center">
                  <button
                    type="button"
                    className="py-2 px-6 rounded-3xl text-white bg-[#2563eb] font-semibold hover:bg-[#1d4ed8] transition"
                    onClick={toggleMenu}
                  >
                    Enquire Now
                  </button>
                  <button
                    type="button"
                    className="py-2 px-6 rounded-3xl text-white border border-white font-semibold hover:bg-white hover:text-[#23284a] transition"
                    onClick={toggleMenu}
                  >
                    Visit E-showroom
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[72px]"></div>
        <Breadcrumb />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout

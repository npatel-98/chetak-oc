import Head from 'next/head'
import { ReactNode } from 'react'
import { Poppins } from '@next/font/google'
import Breadcrumb from './Breadcrumb'
import Footer from './Footer'
import FooterNav from './FooterNav'
import Header from './Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700', '800', '900'],
})

interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{'BAJAJ Auto'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${poppins.className} min-h-screen flex flex-col`}>
        <Header />
        <Breadcrumb />
        <main className="flex-grow">{children}</main>
        <footer className="mt-auto">
          <FooterNav />
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Layout

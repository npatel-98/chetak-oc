import Head from 'next/head'
// import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
// import logout from '../ordercloud/redux/ocAuth/logout'
// import { useOcDispatch, useOcSelector } from '../ordercloud/redux/ocStore'
import Image from 'next/image'
import Link from 'next/link'
const Layout: FunctionComponent = ({ children }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  // const dispatch = useOcDispatch()
  // const { user, isAnonymous, loading, lineItemCount } = useOcSelector((s) => ({
  //   user: s.ocUser.user,
  //   loading: s.ocAuth.loading,
  //   isAnonymous: s.ocAuth.isAnonymous,
  //   lineItemCount: s.ocCurrentOrder.order ? s.ocCurrentOrder.order.LineItemCount : 0,
  // }))

  // const MenuItems = [
  //   {
  //     title: 'Home',
  //     link: '/',
  //   },
  //   {
  //     title: 'Products',
  //     link: '/products',
  //   },
  //   {
  //     title: 'Cart',
  //     link: '/cart',
  //   },
  // ]

  return (
    <>
      <Head>
        <title>React Headstart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <header>
        <h1>React Headstart</h1>
        <p>{`Cart Count ${lineItemCount}`}</p>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
          <Link href="/products">
            <a>Products</a>
          </Link>
          {isAnonymous ? (
            <Link href="/login">
              <a>Login</a>
            </Link>
          ) : (
            <button type="button" disabled={loading} onClick={() => dispatch(logout())}>
              Logout
            </button>
          )}
          {!isAnonymous && user && <p>{`${user.FirstName} ${user.LastName}`}</p>}
        </nav>
      </header> */}

      <div className="relative" id="header">
        <header
          className={`header py-3 ${
            isDropDownOpen ? 'bg-[#f8f9fa]' : 'bg-[#0000003b]'
          } rounded absolute top-0 w-full z-50`}
        >
          <div className="header__wrapper flex items-center justify-around container mx-auto">
            {/* <div className='flex-none'> */}
            <Image
              src="/images/horizontal_logo.png"
              // src='/images/storeLogo.png'
              alt="sd"
              height={75}
              width={155}
            />
            {/* </div> */}

            <div className="flex gap-24 items-center ">
              <div
                onClick={() => {
                  setIsDropDownOpen(!isDropDownOpen)
                }}
                className="flex gap-1 group"
              >
                <button
                  type="button"
                  className={`${
                    isDropDownOpen ? 'text-black' : 'text-[#fff]'
                  } group-hover:text-[#322b54] font-semibold`}
                >
                  Explore
                </button>
                <div
                  className={`text-white ${
                    isDropDownOpen ? '[&>svg]:text-black' : '[&>svg]:text-white'
                  } group-hover:[&>svg]:text-[#322b54] [&>svg]:rotate-90`}
                >
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                  </svg>
                </div>
              </div>
              <div className="buttons flex gap-12">
                <button
                  type="button"
                  className={`py-2 px-8 border ${
                    !isDropDownOpen ? 'border-[#fff] text-[#fff]' : 'border-black text-black'
                  }  rounded-3xl hover:bg-[#fff] hover:text-[#322b54] hover:delay-10`}
                >
                  Test Ride
                </button>
                <button type="button" className="py-2 px-8 rounded-3xl text-[#322b54] bg-[#47bcc8]">
                  Book Now
                </button>
              </div>
              {/* <ul className="header__lists flex flex-cols items-center w-fit">
                {MenuItems.map((item, index) => {
                  return (
                    <li
                      className="font-bold text-[#322b54] hover:text-[#322b54] cursor-pointer md:mx-4"
                      key={index}
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  )
                })}
              </ul>

              <div className="flex gap-4">
                <p className="text-[#322b54]">{`Cart (${lineItemCount})`}</p>

                {isAnonymous ? (
                  <Link href="/login">
                    <a className="text-white hover:text-indigo-400 font-bold">Login</a>
                  </Link>
                ) : (
                  <button
                    className="text-[#322b54]"
                    type="button"
                    disabled={loading}
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                )}
              </div> */}
            </div>
          </div>

          {isDropDownOpen && (
            <div className="flex bg-[#f8f9fa] absolute top-[99px] right-[210px] h-[300px] w-[700px] pt-20">
              <Link href="/products">
              <div className="flex flex-col gap-4 text-center">
                <Image
                  src="/images/b1.webp"
                  // src='/images/storeLogo.png'
                  alt="sd"
                  height={100}
                  width={150}
                />
                <span>2309</span>
              </div>
              </Link>
              <Link href="/products">
              <div className="flex flex-col gap-4 text-center">
                <Image
                  src="/images/b2.webp"
                  // src='/images/storeLogo.png'
                  alt="sd"
                  height={100}
                  width={150}
                />
                <span>2310</span>
              </div>
              </Link>
              <Link href="/products">

              <div className="flex flex-col gap-4 text-center">
                <Image
                  src="/images/b3.webp"
                  // src='/images/storeLogo.png'
                  alt="sd"
                  height={100}
                  width={150}
                />
                <span>2311</span>
              </div>
              </Link>
            </div>
          )}
        </header>
      </div>
      <main>{children}</main>
    </>
  )
}

export default Layout

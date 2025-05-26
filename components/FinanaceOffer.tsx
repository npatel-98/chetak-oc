import React from 'react'
import ImageHelper from '../helper/Image'
import Link from 'next/link'

const FinanceOffers = () => {
  return (
    <div className="relative  overflow-hidden min-h-[400px] w-full flex items-center bg-cover bg-center bg-no-repeat">
      <ImageHelper
        url="https://cdn.bajajauto.com/-/media/Images/diwali-loan-banners/loan-banners/bajaj-color-web.webp"
        className="hidden lg:block"
      />
      <ImageHelper
        url="https://cdn.bajajauto.com/-/media/Images/diwali-loan-banners/loan-banners/bajaj-color-mob.webp"
        className="lg:hidden"
      />
      {/* Left side - Can be used for additional content if needed */}

      {/* Right side - Content */}
      <div className="absolute left-[51%] bottom-[8%] text-white">
        <Link
          href="https://availfinance.bajajauto.com/"
          className="bg-white text-[#2c68c9]  py-3 px-8  hover:bg-gray-100 transition duration-300 text-lg"
        >
          CHECK FINANCE OFFERS
        </Link>
      </div>
    </div>
  )
}

export default FinanceOffers

'use client'

import React, { ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ImageHelper from '../helper/Image'
import Link from 'next/link'

interface VehicleData {
  id: number
  title: string
  subtitle: string
  image: string
  buttonText: string
  href: string
}

const vehicleData: VehicleData[] = [
  {
    id: 1,
    title: 'Motorcycles',
    subtitle: 'Class-leading performance and style',
    image:
      'https://cdn.bajajauto.com/-/media/assets/bajajauto/home-page/product-highlights/motorcycle-img/motorcycle-3.jpg',
    buttonText: 'Know More',
    href: '/motorcycles',
  },
  {
    id: 2,
    title: 'Chetak',
    subtitle: 'The future of mobility',
    image:
      'https://cdn.bajajauto.com/-/media/assets/bajajauto/home-page/product-highlights/chetak-img/chetak-3.jpg',
    buttonText: 'Know More',
    href: 'https://chetak-oc.vercel.app/',
  },
  {
    id: 3,
    title: '3 Wheelers & Qute',
    subtitle: "World's No.1 three-wheeler",
    image:
      'https://cdn.bajajauto.com/-/media/assets/bajajauto/home-page/product-highlights/3wheeler/gogo_homepage_image.webp',
    buttonText: 'Know More',
    href: '/threeWheelers',
  },
  {
    id: 4,
    title: 'KTM',
    subtitle: 'READY TO RACE',
    image:
      'https://cdn.bajajauto.com/-/media/assets/bajajauto/home-page/product-highlights/ktm-img/ktm-3.jpg',
    buttonText: 'Know More',
    href: 'https://ktm-oc.vercel.app/',
  },
  {
    id: 4,
    title: 'International Business',
    subtitle: "The World's Favourite Indian",
    image:
      'https://cdn.bajajauto.com/-/media/assets/bajajauto/home-page/product-highlights/logo/logo-1.jpg',
    buttonText: 'Know More',
    href: 'https://global.globalbajaj.com/',
  },
]

const VehicleCarousel: React.FC = () => {
  return (
    <div className="relative w-full mx-auto px-12 py-8">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{
          horizontalClass: '!top-[98%]',
          type: 'progressbar',
          enabled: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        effect="fade"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        className="vehicle-carousel !pb-10"
      >
        {vehicleData.map(
          (vehicle): ReactElement => (
            <SwiperSlide key={vehicle.id}>
              <div className="bg-white overflow-x-hidden shadow-sm  h-full">
                {/* Image Container */}
                <div className="relative  bg-gray-100">
                  <ImageHelper url={vehicle.image} alt={vehicle.title} className="" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{vehicle.subtitle}</p>
                  <Link
                    href={vehicle.href}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 text-sm"
                  >
                    {vehicle.buttonText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-12 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-gray-50 transition-colors duration-200">
        <ChevronLeft size={20} />
      </button>

      <button className="swiper-button-next-custom absolute right-12 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-blue-600 hover:bg-gray-50 transition-colors duration-200">
        <ChevronRight size={20} />
      </button>

      <style jsx global>{`
        .vehicle-carousel .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  )
}

export default VehicleCarousel

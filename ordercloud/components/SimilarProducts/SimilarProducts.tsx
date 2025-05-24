import React from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import ImageHelper from '../../../helper/Image'
// import useOcProductList from '../../hooks/useOcProductList'
// import formatPrice from '../../utils/formatPrice'
// import { useOcSelector } from '../../redux/ocStore'
// import useOcProductList from '../../hooks/useOcProductList'

interface SimilarProductsProps {
  products?: Array<{
    id: number
    name: string
    price: string
    image: string
    slug: string
  }>
}

const SimilarProducts: React.FC<SimilarProductsProps> = () => {
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const products = useOcProductList({ page: 1 })
  // const itemsPerPage = 4

  // console.log('@@products', products)

  // const nextSlide = () => {
  //   setCurrentIndex((prev) => (prev + itemsPerPage >= products.length ? 0 : prev + itemsPerPage))
  // }

  // const prevSlide = () => {
  //   setCurrentIndex((prev) =>
  //     prev - itemsPerPage < 0 ? Math.max(0, products.length - itemsPerPage) : prev - itemsPerPage
  //   )
  // }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
      <div className="relative">
        {/* <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {products?.map((product) => (
              <div
                key={product.ID}
                className="w-1/3 px-4 flex-shrink-0 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative h-48 w-full">
                    <ImageHelper url={product?.xp?.Images?.[0]?.Url} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.Name}</h3>
                    <p className="text-[#2563eb] font-bold mb-4">
                      {formatPrice(product.PriceSchedule?.PriceBreaks[0].Price)}
                    </p>
                    <a
                      href={`/motorcycles/${product.ID}`}
                      className="block w-full text-center px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors duration-300"
                    >
                      Explore
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button> */}

        {/* <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  )
}

export default SimilarProducts

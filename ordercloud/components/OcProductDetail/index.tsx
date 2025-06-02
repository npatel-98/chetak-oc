import { FunctionComponent } from 'react'
import useOcProductDetail from '../../hooks/useOcProductDetail'
import formatPrice from '../../utils/formatPrice'
import ImageHelper from '../../../helper/Image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface OcProductDetailProps {
  productId: string
}

interface GalleryImage {
  Url: string
}

const OcProductDetail: FunctionComponent<OcProductDetailProps> = ({ productId }) => {
  const { product } = useOcProductDetail(productId)
  const router = useRouter()

  return product ? (
    <div className=" my-8 ">
      <div className="container mx-auto  gap-8">
        <div>
          {/* Left Column: Name and Image */}
          <div className="flex justify-between">
            <div className="mb-4">
              {/* Assuming "Bajaj Pulsar" comes from somewhere else or is static */}
              <h2 className="text-[#0f172a] text-2xl font-black pb-4 lg:pb-8 ">{product.Name}</h2>
            </div>

            {/* Right Column: Price and Details */}
            <div className="p-3">
              {/* Add the "Pulsar NS125 price starting from" text */}
              <p className="text-sm mb-2">{product?.Name} price starting from</p>
              <p className="text-lg font-semibold pb-4 lg:pb-2 ">
                {formatPrice(product.PriceSchedule?.PriceBreaks[0].Price)}
              </p>
              {/* Add the "Ex-showroom Price New Delhi Change City" text/link */}
              <p className="text-xs mb-10">
                Ex-showroom Price New Delhi{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Change City
                </a>
              </p>
              <Link
                href={`${router?.asPath}/booking`}
                className="bg-[#2563eb] px-4 text-white font-semibold py-3 rounded-full w-full text-center  transition hover:bg-[#1d4ed8]"
              >
                BOOK NOW
              </Link>
              {/* Removed Quantity Input and Add/Update Cart Button */}
            </div>
          </div>
          {(product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url) && (
            <div className="flex justify-center">
              <ImageHelper
                url={product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url}
                className="object-cover "
                pictureClasses="h-[420px] w-[600px]"
              />
            </div>
          )}
        </div>

        {/** Product Specification */}
        <div className="my-8 container mx-auto">
          <h2 className="text-[#0f172a] text-2xl font-black pb-4 lg:pb-8 text-center">
            {`${product?.Name} Specifications`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start">
              {product?.xp?.MaxPower && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Max Power</span>
                  <span>{product.xp.MaxPower}</span>
                </div>
              )}
              {product?.xp?.RearSuspension && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Rear Suspension</span>
                  <span>{product.xp.RearSuspension}</span>
                </div>
              )}
              {product?.xp?.Displacement && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Displacement</span>
                  <span>{product.xp.Displacement}</span>
                </div>
              )}
              {product?.xp?.FuelTank && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Fuel Tank</span>
                  <span>{product.xp.FuelTank}</span>
                </div>
              )}
              {product?.xp?.EngineType && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Engine Type</span>
                  <span>{product.xp.EngineType}</span>
                </div>
              )}
              {product?.xp?.SafeBraking && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Safe Braking</span>
                  <span>{product.xp.SafeBraking}</span>
                </div>
              )}

              {product?.xp?.Gradeability && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Gradeability</span>
                  <span>{product.xp.Gradeability}</span>
                </div>
              )}

              {product?.xp?.Variant && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Variant</span>
                  <span>{product.xp.Variant}</span>
                </div>
              )}

              {product?.xp?.TopSpeed && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Top Speed</span>
                  <span>{product.xp.TopSpeed}</span>
                </div>
              )}

              {product?.xp?.DriveModes && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">Drive Modes</span>
                  <span>{product.xp.DriveModes}</span>
                </div>
              )}
              {product?.xp?.CertifiedRange && (
                <div className="flex flex-col border-l-2 border-sky-500 pl-4">
                  <span className="font-bold">SCertified Range</span>
                  <span>{product.xp.CertifiedRange}</span>
                </div>
              )}
            </div>
            {(product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url) && (
              <div className="flex justify-center scale-x-[-1]">
                <ImageHelper
                  url={product?.xp?.Images?.[0]?.Url || product?.xp?.Images?.[1]?.Url}
                  className="object-cover"
                  pictureClasses="h-[420px] w-[600px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/** Image gallery section*/}
      {product?.xp?.GalleryImages && product?.xp?.GalleryImages.length > 0 && (
        <div className="imageGallery flex flex-col  bg-[#E5E5E5] pt-10 pl-10 pb-[60px]">
          <h2 className="text-2xl lg:text-[48px] font-bold">{product?.Name} Gallery</h2>
          <div className="mt-8 flex space-x-4 w-full overflow-x-scroll">
            {product.xp.GalleryImages.map((image: GalleryImage, index: number) => (
              <div key={index} className="w-[300px] lg:w-[400px]">
                <ImageHelper
                  url={image.Url}
                  className="w-full h-auto"
                  pictureClasses="w-[300px] lg:w-[400px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default OcProductDetail

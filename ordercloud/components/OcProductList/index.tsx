import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import useOcProductList from '../../hooks/useOcProductList'
import { OcProductListOptions } from '../../redux/ocProductList'
import OcProductCard from '../OcProductCard'
import Image from 'next/image'
import Link from 'next/dist/client/link'

export interface OcProductListProps {
  options?: OcProductListOptions
  renderItem?: (product: BuyerProduct) => JSX.Element
}

const OcProductList: FunctionComponent<OcProductListProps> = ({ options, renderItem }) => {
  const products = useOcProductList(options)

  return (
    <>
      {products && (
        <>
          {/* <Image 
          src="https://images.unsplash.com/photo-1507914766763-ad9f71098f89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80" 
          alt="Product page"
          layout="fill"
          className="w-full h-screen object-cover"
          unoptimized
          priority 
          /> */}
          <ol className="my-10 grid gap-3 container mx-auto md:grid-cols-2 lg:grid-cols-2">
            {products &&
              products.map((p) => (
                <Link key={p.ID} href={`/products/${p.ID}`}>
                  <li className="">
                    <div className="card bg-[#eff5f7] flex rounded-r-lg">
                      <div className="p-4">
                        <p className="">{p.Name}</p>
                      </div>
                      {/* <li
                    key={p.ID}
                    className="bg-[#526464] mx-4 mb-4 md:w-200px md:max-w-[360px] z-10"
                  >
                    <Image
                      className="object-cover hover:scale-125 transform transition-all duration-300"
                      src={p?.xp?.ImageUrl}
                      alt="sd"
                      width={800}
                      height={500}
                    />
                  </li> */}
                      <Image src="/images/b1.webp" height={400} width={600} />
                    </div>
                  </li>
                </Link>
              ))}
          </ol>
        </>
      )}

      {!products && (
        <>
          <Image
            src="/images/emptyCart.jpg"
            alt="Product page"
            layout="fill"
            className="w-full h-screen object-cover"
            unoptimized
            priority
          />
          <div className="m-10 bg-stone-100 text-center p-4 ">
            <p>No listed products found!</p>
          </div>
        </>
      )}
    </>
  )
}

export default OcProductList
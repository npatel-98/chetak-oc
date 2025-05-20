import Link from 'next/link'
import { BuyerProduct, Filters } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useCallback } from 'react'
import OcProductCard from '../../ordercloud/components/OcProductCard'
import OcProductFacetForm from '../../ordercloud/components/OcProductFacetsForm'
import OcProductList from '../../ordercloud/components/OcProductList'
import useNextRouterMapping, { NextQueryMap } from '../../ordercloud/hooks/useNextRouterMapping'
import ClientOnly from '../../helper/ClientOnly'
import Image from 'next/image'

const queryMap: NextQueryMap = {
  search: 's',
  page: 'p',
  pageSize: 'ps',
  searchOn: 'so',
  sortBy: 'o',
  'xp.size': 'size',
  'xp.color': 'color',
  'xp.test_boolean': 'bool',
  'xp.test_number': 'num',
}

const ProductListPage: FunctionComponent = () => {
  const { isReady, options, updateQuery } = useNextRouterMapping(queryMap)

  const handleFacetChange = useCallback(
    (updatedFilters: Filters) => {
      updateQuery({ ...options, page: undefined, filters: updatedFilters })
    },
    [options, updateQuery]
  )


  const handleRenderItem = (p: BuyerProduct) => {
    return (
      <Link href={`/products/${p.ID}`}>
          <OcProductCard product={p} />
      </Link>
    )
  }
  return (
    isReady && (
      <>
        <div className="banner h-screen w-full relative flex items-center justify-center">
          <Image
            src="/images/product.webp"
            alt="Home page"
            layout="fill"
            className="w-full overflow-hidden object-cover"
            unoptimized
            priority
          />
        </div>
        <ClientOnly>
          <div className="productBackgroundWrapper relative h-screen ">
            <OcProductFacetForm onChange={handleFacetChange} />
            <OcProductList options={options} renderItem={handleRenderItem} />
          </div>
        </ClientOnly>
      </>
    )
  )
}

export default ProductListPage

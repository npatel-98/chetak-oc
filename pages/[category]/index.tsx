import Link from 'next/link'
import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import OcProductCard from '../../ordercloud/components/OcProductCard'
import OcProductList from '../../ordercloud/components/OcProductList'
import useNextRouterMapping, { NextQueryMap } from '../../ordercloud/hooks/useNextRouterMapping'
import ClientOnly from '../../helper/ClientOnly'

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

const categoryConfig = {
  //   products: {
  //     categoryID: 'K0ASflq-VUqL6ZvMAPKHpA',
  //     title: 'Products',
  //   },
  threeWheelers: {
    categoryID: 'vnDFA1_AqE2qRlPagjP_sw',
    title: 'Three Wheelers',
  },
  motorcycles: {
    categoryID: 'K0ASflq-VUqL6ZvMAPKHpA', // Replace with actual category ID
    title: 'Motorcycles',
  },
}

const CategoryListPage: FunctionComponent = () => {
  const router = useRouter()
  const { category } = router.query
  const { options } = useNextRouterMapping(queryMap)

  const handleRenderItem = (p: BuyerProduct) => {
    return (
      <Link href={`/${category}/${p.ID}`}>
        <OcProductCard product={p} />
      </Link>
    )
  }

  const currentCategory = categoryConfig[category as keyof typeof categoryConfig]

  if (!currentCategory) {
    return <div>Category not found</div>
  }

  return (
    <ClientOnly>
      <div className="productBackgroundWrapper relative">
        <OcProductList
          options={{
            ...options,
            catalogID: 'BAJAJ_Catalog',
            categoryID: currentCategory.categoryID,
          }}
          renderItem={handleRenderItem}
        />
      </div>
    </ClientOnly>
  )
}

export default CategoryListPage

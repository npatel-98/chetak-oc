import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { useOcSelector } from '../../../ordercloud/redux/ocStore'
import OcProductDetail from '../../../ordercloud/components/OcProductDetail'

const ProductPage: FunctionComponent = () => {
  const { isReady, query } = useRouter()

  const productName = useOcSelector(
    (s) => s.ocProductDetail.product && s.ocProductDetail.product.Name
  )

  // const handleLineItemUpdated = () => {
  //   push('/cart')
  // }

  return (
    <div className="productBackgroundWrapper relative">
      <Head>
        <title>{productName}</title>
      </Head>
      {isReady ? <OcProductDetail productId={query.productId as string} /> : <h1>Loading</h1>}
    </div>
  )
}

export default ProductPage

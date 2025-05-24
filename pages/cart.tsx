// import Link from 'next/link'
import { FunctionComponent } from 'react'
import OcLineItemList from '../ordercloud/components/OcLineItemList'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
// import SimilarProducts from '../ordercloud/components/SimilarProducts/SimilarProducts'
// import { deleteCurrentOrder } from '../ordercloud/redux/ocCurrentOrder'
// import { useOcDispatch } from '../ordercloud/redux/ocStore'

const CartPage: FunctionComponent = () => {
  // const dispatch = useOcDispatch()

  return (
    <div className="">
      <div className="cartActionWrapper container mx-auto flex justify-end">
        {/* <button type="button" onClick={() => dispatch(deleteCurrentOrder())} className="mx-5 ">
          Clear Cart
        </button>
        <Link href="/checkout">
          <a>Checkout</a>
        </Link> */}
      </div>
      <OcLineItemList emptyMessage="Your shopping cart is empty" editable />
      <div className="px-6 pt-6 border-t border-gray-200 flex items-center justify-end">
        <Link
          href="/checkout"
          className="w-fit flex items-center justify-end gap-2 px-6 py-4 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      {/* <SimilarProducts /> */}
    </div>
  )
}

export default CartPage

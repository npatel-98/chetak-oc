import { FunctionComponent } from 'react'
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder'
import OcLineItemCard from '../OcLineItemCard'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface OcLineItemListProps {
  emptyMessage?: string
  editable?: boolean
}

const OcLineItemList: FunctionComponent<OcLineItemListProps> = ({ emptyMessage, editable }) => {
  const { lineItems } = useOcCurrentOrder()

  return lineItems && lineItems.length ? (
    <div className="space-y-8">
      <div className="cartItemWrapper container mx-auto w-full my-10 py-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="px-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <p className="text-gray-500 mt-2">Review your items before checkout</p>
        </div>

        <ol className="divide-y divide-gray-200">
          {lineItems.map((li) => (
            <li key={li.ID} className="py-6 px-6 hover:bg-gray-50 transition-colors duration-200">
              <OcLineItemCard lineItem={li} editable={editable} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-xl shadow-lg mx-4 my-10 p-8">
      <div className="animate-bounce mb-6">
        <ShoppingCart size={80} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-600 mb-4">
        {emptyMessage || 'Your cart is empty'}
      </h3>
      <p className="text-gray-500 mb-8 text-center">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        href="/motorcycles"
        className="px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Start Shopping
      </Link>
    </div>
  )
}

export default OcLineItemList

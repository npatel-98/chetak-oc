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
    <ol className="cartItemWrapper container mx-auto w-full my-10 py-4  bg-[#eff5f7] rounded-lg">
      {lineItems.map((li) => (
        <li key={li.ID} className="mb-6 mx-4">
          <OcLineItemCard lineItem={li} editable={editable} />
        </li>
      ))}
    </ol>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#eff5f7] rounded-lg mx-4 my-10 p-8">
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
        className="px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        Start Shopping
      </Link>
    </div>
  )
}

export default OcLineItemList

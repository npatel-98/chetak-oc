import { FunctionComponent } from 'react'
import { LineItem } from 'ordercloud-javascript-sdk'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface OcLineItemCardProps {
  lineItem: LineItem
  editable?: boolean
}

const OcLineItemCard: FunctionComponent<OcLineItemCardProps> = ({ lineItem, editable }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={lineItem.Product?.xp?.Images?.[0]?.Url || '/images/placeholder.jpg'}
          alt={lineItem.Product?.Name || 'Product image'}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{lineItem.Product?.Name}</h3>
        <p className="text-gray-500 text-sm mb-2">{lineItem.Product?.Description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Quantity:</span>
              <div className="px-3 py-1 bg-gray-100 rounded-md text-gray-700">
                {lineItem.Quantity}
              </div>
            </div>
            <div className="text-[#2563eb] font-bold">₹{lineItem.LineTotal}</div>
          </div>

          {editable && (
            <button
              className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OcLineItemCard

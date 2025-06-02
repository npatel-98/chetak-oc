import { FunctionComponent } from 'react'
import { useOcSelector } from '../../redux/ocStore'
import Link from 'next/link'

interface OcOrderConfirmationProps {
  orderId: string
}

const OcOrderConfirmation: FunctionComponent<OcOrderConfirmationProps> = ({ orderId }) => {
  const recentOrder = useOcSelector((s) =>
    s.ocCurrentOrder.recentOrders.find((ro) => ro.order.ID === orderId)
  )

  if (!recentOrder) {
    return (
      <div className="max-w-7xl mx-auto p-8 font-sans">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-24 h-24 mb-6">
            <svg
              className="w-full h-full text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We couldn't find any order with the ID: <span className="font-medium">{orderId}</span>
          </p>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">This could be because:</p>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>• The order ID might be incorrect</li>
              <li>• The order might have been placed recently and is still processing</li>
              <li>• You might need to refresh the page</li>
            </ul>
          </div>
          <Link
            href={'/'}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Home page
          </Link>
        </div>
      </div>
    )
  }

  const { order, lineItems } = recentOrder
  const lineItem = lineItems[0] // Since we know there's only one line item

  return (
    <div className="max-w-7xl mx-auto p-8 font-sans">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Order Confirmation</h1>
        <div className="flex items-center gap-4">
          <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-medium capitalize">
            {order.Status}
          </span>
          <span className="text-gray-600 text-sm">
            Ordered on {new Date(order.DateCreated).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="lg:w-1/2">
              <img
                src={lineItem.Product.xp.Images[0].Url}
                alt={lineItem.Product.Name}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{lineItem.Product.Name}</h2>
              <div className="space-y-2 mb-6">
                <div className="text-gray-600">
                  <span className="font-medium text-gray-800">Engine:</span>{' '}
                  {lineItem.Product.xp.Engine}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium text-gray-800">Max Power:</span>{' '}
                  {lineItem.Product.xp.MaxPower}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium text-gray-800">Max Torque:</span>{' '}
                  {lineItem.Product.xp.MaxTorque}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <span className="font-medium text-gray-800">Selected Model:</span>{' '}
                  {lineItem.xp.selectedModel}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Selected Color:</span>
                  <div
                    className="w-6 h-6 rounded border border-gray-200"
                    style={{ backgroundColor: lineItem.xp.selectedColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{2000}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{order.ShippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{order.TaxCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>₹{2000}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Customer Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Name:</span> {lineItem.xp.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Email:</span> {lineItem.xp.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Phone:</span> {lineItem.xp.mobile}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Location:</span> {lineItem.xp.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Dealer:</span> {lineItem.xp.dealer}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Buying Plan:</span>{' '}
                {lineItem.xp.buyingPlan}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OcOrderConfirmation

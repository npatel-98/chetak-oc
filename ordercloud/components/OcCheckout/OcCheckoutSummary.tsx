import { FunctionComponent, useMemo } from 'react'
import { useOcSelector } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'

const OcCheckoutSummary: FunctionComponent = () => {
  const { order, shipEstimateResponse, payments } = useOcSelector((s) => s.ocCurrentOrder)

  const isShippingAccurate = useMemo(() => {
    return (
      shipEstimateResponse &&
      shipEstimateResponse.ShipEstimates &&
      shipEstimateResponse.ShipEstimates.filter((se) => !se.SelectedShipMethodID).length === 0
    )
  }, [shipEstimateResponse])

  const isTaxAccurate = useMemo(() => {
    return order && order.BillingAddress && isShippingAccurate
  }, [order, isShippingAccurate])

  if (!order) return null

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-gray-600">
          <span className="text-sm md:text-base">Subtotal</span>
          <span className="text-sm md:text-base font-medium">₹{2000}</span>
        </div>

        {order.PromotionDiscount ? (
          <div className="flex justify-between items-center text-green-600">
            <span className="text-sm md:text-base">Promotion</span>
            <span className="text-sm md:text-base font-medium">
              -{formatPrice(order.PromotionDiscount)}
            </span>
          </div>
        ) : null}

        <div className="flex justify-between items-center text-gray-600">
          <span className="text-sm md:text-base">Shipping</span>
          <span className="text-sm md:text-base font-medium">
            {isShippingAccurate ? formatPrice(order.ShippingCost) : '---'}
          </span>
        </div>

        <div className="flex justify-between items-center text-gray-600">
          <span className="text-sm md:text-base">Tax</span>
          <span className="text-sm md:text-base font-medium">
            {isTaxAccurate ? formatPrice(order.TaxCost) : '---'}
          </span>
        </div>

        {payments?.map((p) => (
          <div key={p.ID} className="flex justify-between items-center text-gray-600">
            <span className="text-sm md:text-base">{`${p.Type} Payment`}</span>
            <span className="text-sm md:text-base font-medium">-{formatPrice(p.Amount)}</span>
          </div>
        ))}

        <div className="border-t border-gray-200 my-3"></div>

        <div className="flex justify-between items-center">
          <span className="text-base md:text-lg font-semibold text-gray-800">Total</span>
          <span className="text-base md:text-lg font-bold text-gray-900">₹{2000}</span>
        </div>
      </div>
    </div>
  )
}

export default OcCheckoutSummary

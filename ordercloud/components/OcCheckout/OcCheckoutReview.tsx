import { FunctionComponent, useCallback } from 'react'
import { OcCheckoutStepProps } from '.'
import { submitOrder } from '../../redux/ocCurrentOrder'
import { useOcDispatch } from '../../redux/ocStore'
import OcLineItemList from '../OcLineItemList'
import OcCheckoutSummary from './OcCheckoutSummary'

interface OcCheckoutReviewProps extends OcCheckoutStepProps {
  onOrderSubmitted: (orderId: string) => void
}

const OcCheckoutReview: FunctionComponent<OcCheckoutReviewProps> = ({
  onPrev,
  onOrderSubmitted,
}) => {
  const dispatch = useOcDispatch()
  const handleSubmitOrder = useCallback(async () => {
    await dispatch(submitOrder(onOrderSubmitted))
  }, [dispatch, onOrderSubmitted])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Review Your Order</h2>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
        <OcLineItemList />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
        <OcCheckoutSummary />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
        >
          ← Edit Payment
        </button>
        <button
          type="button"
          onClick={handleSubmitOrder}
          className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
        >
          Submit Order
        </button>
      </div>
    </div>
  )
}

export default OcCheckoutReview

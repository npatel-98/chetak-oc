import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useMemo } from 'react'
import { OcCheckoutStepProps } from '.'
import { saveBillingAddress } from '../../redux/ocCurrentOrder'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'
import OcAddressForm from '../OcAddressForm'

const OcCheckoutBilling: FunctionComponent<OcCheckoutStepProps> = ({ onNext, onPrev }) => {
  const dispatch = useOcDispatch()
  const { initialized, order } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }))

  // const currentShippingAddress = useMemo(() => {
  //   if (initialized && lineItems && lineItems.length) {
  //     return lineItems[0].ShippingAddress
  //   }
  //   return {}
  // }, [initialized, lineItems])

  const currentBillingAddress = useMemo(() => {
    if (initialized && order) {
      return order.BillingAddress
    }
    return null
  }, [initialized, order])

  // const showAddressBook = useMemo(() => {
  //   return user && user.AvailableRoles && user.AvailableRoles.includes('MeAddressAdmin')
  // }, [user])

  // const shippingEqualsBilling = useMemo(() => {
  //   if (!(order && order.BillingAddress && order.BillingAddress.Street1)) return false
  //   return isEqual(currentShippingAddress, order.BillingAddress)
  // }, [currentShippingAddress, order])

  const handleSetBillingAddress = (address: Partial<BuyerAddress>) => {
    dispatch(saveBillingAddress(address))
  }

  // const handleSameAsShippingChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.checked) {
  //       dispatch(saveBillingAddress(currentShippingAddress))
  //     } else {
  //       dispatch(removeBillingAddress())
  //     }
  //   },
  //   [dispatch, currentShippingAddress]
  // )

  return initialized && order ? (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing Information</h2>

      {/* <div className="mb-6">
        <label 
          htmlFor="SameAsShipping" 
          className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          <input
            type="checkbox"
            id="SameAsShipping"
            name="SameAsShipping"
            onChange={handleSameAsShippingChange}
            checked={shippingEqualsBilling}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">Use shipping address as billing address</span>
        </label>
      </div> */}

      <div className="space-y-6">
        <OcAddressForm
          id="billing"
          address={currentBillingAddress}
          onSubmit={handleSetBillingAddress}
        />
      </div>

      <hr className="my-8 border-gray-200" />

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
        >
          Back to Shipping
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  ) : null
}

export default OcCheckoutBilling

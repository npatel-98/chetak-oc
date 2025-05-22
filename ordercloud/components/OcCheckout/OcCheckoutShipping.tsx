import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useMemo } from 'react'
// import { saveShippingAddress } from '../../redux/ocCurrentOrder'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'
// import OcAddressBook from '../OcAddressBook'
import OcAddressForm from '../OcAddressForm'
import OcShipEstimates from './OcShipEstimates'
import { OcCheckoutStepProps } from './index'
import { saveShippingAddress } from '../../redux/ocCurrentOrder'

const OcCheckoutShipping: FunctionComponent<OcCheckoutStepProps> = ({ onNext, }) => {
  const dispatch = useOcDispatch()

  const { initialized, order, lineItems } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }))

  const handleSetShippingAddress = (address: Partial<BuyerAddress>) => {
    console.log('@@address', address)
    dispatch(saveShippingAddress(address))
  }

  const currentShippingAddress = useMemo(() => {
    if (initialized && lineItems && lineItems.length) {
      return lineItems[0].ShippingAddress
    }
    return {}
  }, [initialized, lineItems])

  // const showAddressBook = useMemo(() => {
  //   return user && user.AvailableRoles && user.AvailableRoles.includes('MeAddressAdmin')
  // }, [user])

  return initialized && order ? (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping</h2>
      {/* {showAddressBook ? (
        <OcAddressBook
          id="shipping"
          listOptions={{ pageSize: 100 }}
          selected={order.ShippingAddressID}
          onChange={handleSetShippingAddress}
        />
      ) : ( */}
        <OcAddressForm
          id="shipping"
          address={currentShippingAddress}
          onSubmit={handleSetShippingAddress}
        />
      {/* )} */}
      <OcShipEstimates />
      <hr />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          <span>Continue to Billing</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : null
}

export default OcCheckoutShipping

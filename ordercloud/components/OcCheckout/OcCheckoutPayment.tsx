import { FormEvent, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { OcCheckoutStepProps } from '.'
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder'
import { addPayment, removePayment } from '../../redux/ocCurrentOrder'
import { useOcDispatch } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'

const OcCheckoutPayment: FunctionComponent<OcCheckoutStepProps> = ({ onNext, onPrev }) => {
  const dispatch = useOcDispatch()
  const { order, payments } = useOcCurrentOrder()

  const amountDue = useMemo(() => {
    if (!order) return 0
    if (!payments || (payments && !payments.length)) return order.Total
    return order.Total - payments.map((p) => p.Amount).reduceRight((p, c) => p + c)
  }, [order, payments])

  const [pendingPayment, setPendingPayment] = useState(amountDue)

  const handleAddPayment = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch(addPayment({ Type: 'PurchaseOrder', Amount: pendingPayment }))
    },
    [dispatch, pendingPayment]
  )

  const handleRemovePayment = useCallback(
    (paymentId: string) => () => {
      dispatch(removePayment(paymentId))
    },
    [dispatch]
  )

  useEffect(() => {
    setPendingPayment(amountDue)
  }, [amountDue])

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Payment</h2>
      <h3 className="text-xl text-gray-600 mb-6">Amount Due: {formatPrice(amountDue)}</h3>

      {payments && payments.length > 0 && (
        <div className="mb-6">
          {payments.map((p) => (
            <div
              key={p.ID}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-3"
            >
              <p className="text-gray-700">
                {p.Type} <b>{formatPrice(p.Amount)}</b>
              </p>
              <button
                type="button"
                onClick={handleRemovePayment(p.ID)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <form
        id="checkout_payment"
        onSubmit={handleAddPayment}
        className="bg-white p-6 rounded-lg shadow-sm mb-6"
      >
        <label htmlFor="checkout_pending_payment" className="block text-gray-700 mb-4">
          Payment Amount
          <input
            id="checkout_pending_payment"
            type="number"
            max={amountDue}
            min="1"
            value={pendingPayment}
            step="0.01"
            readOnly
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded bg-gray-50 cursor-not-allowed"
          />
        </label>
        <button
          type="submit"
          disabled={!amountDue}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Payment
        </button>
      </form>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors w-full sm:w-auto"
        >
          Edit Billing
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!!amountDue}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          Review Order
        </button>
      </div>
    </div>
  )
}

export default OcCheckoutPayment

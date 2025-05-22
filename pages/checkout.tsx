import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import OcCheckout from '../ordercloud/components/OcCheckout'
import OcCheckoutSummary from '../ordercloud/components/OcCheckout/OcCheckoutSummary'
import OcLineItemList from '../ordercloud/components/OcLineItemList'
import { useOcSelector } from '../ordercloud/redux/ocStore'

const CheckoutPage: FunctionComponent = () => {
  const { push } = useRouter()
  const { order, initialized } = useOcSelector((s) => s.ocCurrentOrder)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!initialized || !order || (order && !order.LineItemCount)) {
      push('/cart')
    }
  }, [order, initialized, push])

  return initialized ? (
    <div className="container mx-auto flex flex-col flex-col-reverse gap-10 lg:flex-row  w-full checkout">
      <OcCheckout
        onSubmitted={(orderId: string) => push(`/confirmation/${orderId}`)}
        setCheckoutStep={setStep}
      />
      {step !== 3 && (
        <div className="w-full">
          <OcLineItemList />
          <OcCheckoutSummary />
        </div>
      )}
    </div>
  ) : null
}

export default CheckoutPage

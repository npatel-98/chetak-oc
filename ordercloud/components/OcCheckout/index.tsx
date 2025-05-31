import { FunctionComponent } from 'react'
// import { OcCurrentOrderState } from '../../redux/ocCurrentOrder'
// import OcCheckoutBilling from './OcCheckoutBilling'
// import OcCheckoutPayment from './OcCheckoutPayment'
import OcCheckoutReview from './OcCheckoutReview'
import { useRouter } from 'next/router'
// import OcCheckoutShipping from './OcCheckoutShipping'
// import OcCheckoutSummary from './OcCheckoutSummary'

export interface OcCheckoutStepProps {
  onNext?: () => void
  onPrev?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OcCheckout: FunctionComponent<{ onSubmitted: any; setCheckoutStep?: any }> = ({
  // onSubmitted,
  setCheckoutStep,
}) => {
  const { push } = useRouter()
  // const [_, setStep] = useState(0)

  // const handlePrevClick = () => {
  //   setStep((s) => s - 1)
  //   setCheckoutStep((s) => s - 1)
  // }

  const handleNextClick = () => {
    // setStep((s) => s + 1)
    setCheckoutStep((s) => s + 1)
  }

  const handleOrderSubmitted = (orderId: string) => {
    // onSubmitted(orderId)
    push(`/confirmation/${orderId}`)
    // setCheckoutStep(0)
    // setStep(0)
  }

  return (
    <div className="w-full">
      {/* {step === 0 && <OcCheckoutShipping onPrev={handlePrevClick} onNext={handleNextClick} />}
      {step === 1 && <OcCheckoutBilling onPrev={handlePrevClick} onNext={handleNextClick} />}
      {step === 2 && <OcCheckoutPayment onPrev={handlePrevClick} onNext={handleNextClick} />} */}
      {/* {step === 3 && ( */}
      <OcCheckoutReview
        // onPrev={handlePrevClick}
        onNext={handleNextClick}
        onOrderSubmitted={handleOrderSubmitted}
      />
      {/* )} */}
    </div>
  )
}

export default OcCheckout

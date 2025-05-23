// pages/products/[productId]/booking.js
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { User, Phone, MapPin, Store, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useOcProductDetail from '../../../ordercloud/hooks/useOcProductDetail'
import useOcCart from '../../../ordercloud/redux/useOcCart'
import ImageHelper from '../../../helper/Image'
import formatPrice from '../../../ordercloud/utils/formatPrice'
import { Me } from 'ordercloud-javascript-sdk'

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  location: Yup.string().required('Location is required'),
  dealer: Yup.string().required('Please select a dealer'),
  buyingPlan: Yup.string().required('Please select when you plan to buy'),
})

export default function ProductBookingPage() {
  const router = useRouter()
  const { productId } = router.query
  const { product } = useOcProductDetail(productId as string)
  const [isBooked, setIsBooked] = useState(false)
  const { addToCart } = useOcCart()
  const [variants, setVariants] = useState(null)
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
    const getVariants = async () => {
      const res = await Me.ListVariants(product?.ID)
      setVariants(res?.Items)

      // Set first variant as default if available
      if (res?.Items?.[0]?.xp?.Models?.[0]) {
        const firstModel = Object.keys(res.Items[0].xp.Models[0])[0]
        setSelectedModel(firstModel)
        const firstColor = res.Items[0].xp.Models[0][firstModel][0].colors[0]
        setSelectedColor(firstColor.color)
        setCurrentImage(firstColor.Image)
      }
    }
    if (product?.ID) getVariants()
  }, [product?.ID])

  useEffect(() => {
    if (selectedModel && variants?.[0]?.xp?.Models) {
      const modelData = variants[0].xp.Models.find(
        (model) => Object.keys(model)[0] === selectedModel
      )
      if (modelData) {
        const colors = modelData[selectedModel][0].colors
        if (colors && colors.length > 0) {
          setSelectedColor(colors[0].color)
          setCurrentImage(colors[0].Image)
        }
      }
    }
  }, [selectedModel, variants])

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value)
  }

  const handleColorChange = (color, image) => {
    setSelectedColor(color)
    setCurrentImage(image)
  }

  // Mock data - replace with your actual data
  const dealers = [
    'Authorized Dealer 1',
    'Authorized Dealer 2',
    'Authorized Dealer 3',
    'Authorized Dealer 4',
  ]

  const buyingOptions = ['Within 1 month', 'Within 3 months', 'Within 6 months', 'Just exploring']

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form submitted:', values)
      await addToCart({ productId: product?.ID, quantity: 1, specs: variants?.[0]?.Specs })
      setIsBooked(false)
      //   console.log("@@res",res)

      // Simulate API call

      //   router.push(`/products/${productid}`)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!product) return null

  return (
    <div className="mx-auto p-4">
      {/* Header and Product Image Section */}
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* Product Image */}
        <div className="flex flex-col justify-center items-center w-full gap-10">
          <h2 className="text-2xl font-bold">{product?.Name}</h2>
          <ImageHelper url={currentImage} className="max-w-[600px]" />
        </div>

        {/* Right Column Section - Conditionally Rendered */}
        <div className="space-y-6 w-full">
          {!isBooked ? (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">SELECT MODEL</h3>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedModel}
                  onChange={handleModelChange}
                >
                  {variants?.[0]?.xp?.Models &&
                    variants?.[0]?.xp?.Models?.map((model) => Object.keys(model))
                      .flat()
                      ?.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700">SELECT COLOR</h3>
                <div className="flex items-center gap-4">
                  {selectedModel &&
                    variants?.[0]?.xp?.Models &&
                    variants[0].xp.Models.find(
                      (model) => Object.keys(model)[0] === selectedModel
                    )?.[selectedModel][0].colors.map((colorData, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          selectedColor === colorData.color
                            ? 'border-blue-500'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: colorData.color }}
                        onClick={() => handleColorChange(colorData.color, colorData.Image)}
                      />
                    ))}
                </div>
              </div>

              {/* Top Features Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">TOP FEATURES</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {product?.xp?.Bullets?.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>

              {/* Booking Details and Price Section */}
              <div className="mt-8 animate-slide-up">
                <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="text-xl font-bold text-gray-800">
                    {formatPrice(product?.PriceSchedule?.PriceBreaks?.[0]?.Price)}
                    <p className="text-sm font-normal text-gray-600">
                      *Ex-showroom price -{' '}
                      <span className="text-blue-600 cursor-pointer">New Delhi</span>{' '}
                      <span className="text-blue-600 cursor-pointer">Change City</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBooked(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-200"
                  >
                    BOOK NOW @ ₹ 2000
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">FILL YOUR DETAILS BELOW</h2>
              <Formik
                initialValues={{
                  name: '',
                  mobile: '',
                  location: '',
                  dealer: '',
                  buyingPlan: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="sr-only text-sm">
                        Enter name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full text-sm p-2 pl-10 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none"
                          placeholder="Enter name"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Mobile Number Input */}
                    <div>
                      <label htmlFor="mobile" className="sr-only">
                        Enter mobile number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-blue-600" />
                        </div>
                        <Field
                          type="text"
                          id="mobile"
                          name="mobile"
                          className="w-full text-sm p-2 pl-10 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none"
                          placeholder="Enter mobile number"
                        />
                      </div>
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Location Input */}
                    <div>
                      <label htmlFor="location" className="sr-only">
                        Enter Area "e.g. Andheri"
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <Field
                          type="text"
                          id="location"
                          name="location"
                          className="w-full text-sm p-2 pl-10 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none pr-24"
                          placeholder='Enter Area "e.g. Andheri"'
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:underline"
                        >
                          Detect
                        </button>
                      </div>
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Dealer Select */}
                    <div>
                      <label htmlFor="dealer" className="sr-only">
                        Select Dealer
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Store className="h-5 w-5 text-blue-600" />
                        </div>
                        <Field
                          as="select"
                          id="dealer"
                          name="dealer"
                          className="w-full text-sm p-2 pl-10 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none"
                        >
                          <option value="">Select Dealer</option>
                          {dealers.map((dealer, index) => (
                            <option key={index} value={dealer}>
                              {dealer}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="dealer"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Buying Plan Select */}
                    <div>
                      <label htmlFor="buyingPlan" className="sr-only">
                        Select When you plan to buy
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <Field
                          as="select"
                          id="buyingPlan"
                          name="buyingPlan"
                          className="w-full text-sm p-2 pl-10 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none"
                        >
                          <option value="">Select When you plan to buy</option>
                          {buyingOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="buyingPlan"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Verify and Pay Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors duration-200 disabled:bg-gray-400"
                    >
                      {isSubmitting ? 'PROCESSING...' : 'VERIFY AND PAY'}
                    </button>

                    {/* T&C and Privacy Policy */}
                    <p className="text-center text-sm text-gray-600">
                      By clicking on Verify and Pay, you agree to our{' '}
                      <Link href="#" className="text-blue-600 hover:underline">
                        T&C
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

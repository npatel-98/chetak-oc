import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useCallback, useEffect, useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { EMPTY_ADDRESS } from '../../redux/ocAddressBook'

interface OcAddressFormProps {
  id: string
  onSubmit: (address: BuyerAddress) => void
  onDelete?: (addressId: string) => void
  address?: BuyerAddress
  setIsButtonDisabled?: (val: boolean) => void
  onSuccess?: () => void
}

// Validation schema
const validationSchema = Yup.object({
  AddressName: Yup.string(),
  CompanyName: Yup.string(),
  FirstName: Yup.string().required('First name is required'),
  LastName: Yup.string().required('Last name is required'),
  Street1: Yup.string().required('Street address is required'),
  Street2: Yup.string(),
  City: Yup.string().required('City is required'),
  State: Yup.string().required('State is required'),
  Zip: Yup.string()
    .required('Zip code is required')
    .matches(/^\d{5}$/, 'Zip code must be 6 digits'),
  Country: Yup.string()
    .required('Country is required')
    .matches(/^[A-Z]{2}$/, 'Country must be a 2-letter code'),
  Phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
})

const OcAddressForm: FunctionComponent<OcAddressFormProps> = ({
  id,
  onSubmit,
  onDelete,
  address,
  setIsButtonDisabled,
  onSuccess,
}) => {
  const initialValues = useMemo(() => address || EMPTY_ADDRESS, [address])

  const handleDeleteAddress = useCallback(() => {
    onDelete(address.ID)
  }, [onDelete, address])

  const handleSubmit = useCallback(
    (values: BuyerAddress) => {
      onSubmit(values)
      onSuccess?.()
    },
    [onSubmit, onSuccess]
  )

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {address && address.ID ? 'Edit Address' : 'Add New Address'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
      >
        {({ isSubmitting, dirty, isValid }) => {
          useEffect(() => {
            if (isValid && !isSubmitting && dirty) {
              console.log('@@true')
              setIsButtonDisabled && setIsButtonDisabled(false)
            } else {
              setIsButtonDisabled && setIsButtonDisabled(true)
            }
          }, [isValid, isSubmitting])

          return (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_addressName`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address Name
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_addressName`}
                    name="AddressName"
                    placeholder="Home, Office, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="AddressName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_companyName`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_companyName`}
                    name="CompanyName"
                    placeholder="Enter company name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="CompanyName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_firstName`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_firstName`}
                    name="FirstName"
                    placeholder="Enter first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="FirstName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_lastName`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_lastName`}
                    name="LastName"
                    placeholder="Enter last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="LastName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label
                    htmlFor={`${id}_address_street1`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_street1`}
                    name="Street1"
                    placeholder="Enter street address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="Street1"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label
                    htmlFor={`${id}_address_street2`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address Line 2
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_street2`}
                    name="Street2"
                    placeholder="Floor, suite, apartment #"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="Street2"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_city`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_city`}
                    name="City"
                    placeholder="Enter city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage name="City" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_state`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_state`}
                    name="State"
                    placeholder="Enter state"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="State"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_zip`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Zip Code *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_zip`}
                    name="Zip"
                    placeholder="Enter zip code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage name="Zip" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="form-group">
                  <label
                    htmlFor={`${id}_address_country`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country *
                  </label>
                  <Field
                    type="text"
                    id={`${id}_address_country`}
                    name="Country"
                    placeholder="Enter two-digit country code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="Country"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label
                    htmlFor={`${id}_address_phone`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <Field
                    type="tel"
                    id={`${id}_address_phone`}
                    name="Phone"
                    placeholder="Enter 10 digit phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <ErrorMessage
                    name="Phone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-end mt-8">
                {address && address.ID && (
                  <button
                    type="button"
                    onClick={handleDeleteAddress}
                    disabled={dirty || !address.ID}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Delete Address
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting
                    ? 'Saving...'
                    : address && address.ID
                    ? 'Update Address'
                    : 'Save Address'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default OcAddressForm

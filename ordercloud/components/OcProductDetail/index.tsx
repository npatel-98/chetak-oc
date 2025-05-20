import { Spec } from 'ordercloud-javascript-sdk'
import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
import useOcProductDetail from '../../hooks/useOcProductDetail'
import { createLineItem, updateLineItem } from '../../redux/ocCurrentOrder'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'
import OcQuantityInput from '../OcQuantityInput'
import OcProductSpecField from './OcProductSpecField'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface OcProductDetailProps {
  productId: string
  lineItemId?: string
  onLineItemAdded?: () => void
  onLineItemUpdated?: () => void
}

const determineDefaultOptionId = (spec: Spec) => {
  if (spec.DefaultOptionID) return spec.DefaultOptionID
  return spec.OptionCount ? spec.Options[0].ID : undefined
}

const OcProductDetail: FunctionComponent<OcProductDetailProps> = ({
  productId,
  lineItemId,
  onLineItemAdded,
  onLineItemUpdated,
}) => {
  const dispatch = useOcDispatch()
  const { product, specs, variants } = useOcProductDetail(productId)
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const [specValues, setSpecValues] = useState([])

  const lineItem = useOcSelector((s) =>
    lineItemId && s.ocCurrentOrder.lineItems
      ? s.ocCurrentOrder.lineItems.find((li) => li.ID === lineItemId)
      : undefined
  )

  useEffect(() => {
    if (lineItem) {
      setSpecValues(lineItem.Specs)
    } else if (specs) {
      setSpecValues(
        specs.map((s) => {
          return {
            SpecID: s.ID,
            OptionID: determineDefaultOptionId(s),
            Value: s.DefaultValue ? s.DefaultValue : undefined,
          }
        })
      )
    }
  }, [specs, lineItem])

  const [quantity, setQuantity] = useState(
    lineItem ? lineItem.Quantity : (product && product.PriceSchedule?.MinQuantity) || 1
  )

  const handleSpecFieldChange = (values: { SpecID: string; OptionID?: string; Value?: string }) => {
    setSpecValues((sv) =>
      sv.map((s) => {
        if (s.SpecID === values.SpecID) {
          return {
            SpecID: values.SpecID,
            OptionID: values.OptionID === 'OpenText' ? undefined : values.OptionID,
            Value: values.Value,
          }
        }
        return s
      })
    )
  }

  const handleAddToCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)
      await dispatch(
        createLineItem({ ProductID: product.ID, Quantity: quantity, Specs: specValues })
      )
      setLoading(false)
      if (onLineItemAdded) {
        onLineItemAdded()
      }
      router.push('/cart');
    },
    [dispatch, product, quantity, onLineItemAdded, specValues]
  )

  const handleUpdateCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)
      await dispatch(updateLineItem({ ...lineItem, Quantity: quantity, Specs: specValues }))
      setLoading(false)
      if (onLineItemUpdated) {
        onLineItemUpdated()
      }

      router.push('/cart');
    },
    [dispatch, lineItem, quantity, onLineItemUpdated, specValues]
  )

  return product ? (
    <div className="md:grid grid-cols-12 my-8 container mx-auto">
      <div className="imageWrapper mr-5 md:col-span-7">
        {product?.xp?.ImageUrl && (
          // <Image
          //   src={product?.xp?.ImageUrl}
          //   width={1000}
          //   height={650}
          //   layout="responsive"
          //   className="object-cover"
          // />
          <Image
            src="/images/b1.webp"
            width={1000}
            height={650}
            layout="responsive"
            className="object-cover"
          />
        )}
      </div>

      <div className="specWrapper md:col-span-5 p-3 z-20">
        <h2 className="text-[#0f172a] text-2xl lg:text-6xl pb-4 lg:pb-8 ">{product.Name}</h2>

        <p className="text-2xl pb-4 lg:pb-8">
          {formatPrice(product.PriceSchedule?.PriceBreaks[0].Price)}
        </p>
        <p className="" dangerouslySetInnerHTML={{ __html: product.Description }} />

        {/* Quantyity and Add to Cart: */}
        <form onSubmit={lineItem ? handleUpdateCart : handleAddToCart}>
          {specs &&
            specs.map((s) => {
              const specValue = specValues.find((sv) => sv.SpecID === s.ID)
              return (
                <OcProductSpecField
                  key={s.ID}
                  spec={s}
                  onChange={handleSpecFieldChange}
                  optionId={specValue && specValue.OptionID}
                  value={specValue && specValue.Value}
                />
              )
            })}
          <OcQuantityInput
            controlId="addToCart"
            priceSchedule={product.PriceSchedule}
            quantity={quantity}
            onChange={setQuantity}
          />

          <button
            className=" px-12 py-3 w-full md:w-3/5 mt-8 py-2 px-8 rounded-3xl text-[#322b54] bg-[#47bcc8] shadow-lg hover:shadow-stone-500 focus:shadow-stone-500 transition duration-150 ease-out hover:ease-in "
            type="submit"
            disabled={loading}
          >
            {`${lineItem ? 'Update' : 'Add To'} Cart`}
          </button>
        </form>
      </div>
    </div>
  ) : null
}

export default OcProductDetail
import React from 'react'
import { Bike, Clock, IndianRupee } from 'lucide-react'
import { format } from 'date-fns'
import { OrderWorksheetWithXP } from '../ordercloud/redux/xp'
import ImageHelper from '../helper/Image'
import { LineItem } from 'ordercloud-javascript-sdk'

const OrderCard: React.FC<{ order: OrderWorksheetWithXP }> = ({ order }) => {
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString)
    return !isNaN(date?.getTime())
  }
  function formatDate(isoDateString: string) {
    if (!isoDateString) {
      return
    }
    if (
      !isValidDate(isoDateString) ||
      typeof isoDateString === 'number' ||
      typeof isoDateString === 'boolean'
    ) {
      return isoDateString
    }
    const date = new Date(isoDateString)
    const formattedDate = format(date, 'MMMM do yyyy')
    return formattedDate
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Order #{order.Order.ID}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.Order.Status === 'Open'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {order.Order.Status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              Ordered on: {formatDate(order.Order.DateCreated)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <IndianRupee className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Booked Price: {2000}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {order?.LineItems.map((item: LineItem) => (
          <div key={item.ID} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <ImageHelper
                  url={item.Product.xp.Images[0]?.Url}
                  alt={item.Product.Name}
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-semibold mb-2">{item.Product.Name}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Model: {item.xp.model}</p>
                  <p>Color: {item.xp.color}</p>
                  <p>Dealership: {item.xp.dealership}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Bike className="w-3 h-3 mr-1" />
                    Range: {item.Product.xp.Range}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Top Speed: {item.Product.xp.TopSpeed}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MyOrders() {
  // This would typically come from an API call
  const orders: OrderWorksheetWithXP[] = [
    {
      Order: {
        ID: 'B1748661170370',
        FromUser: {
          ID: 'defaultbuyer',
          CompanyID: 'BAJAJ_Buyer',
          Username: 'defaultbuyer',
          Password: null,
          FirstName: 'default',
          LastName: 'buyer',
          Email: 'bajaj_oc@outlook.com',
          Phone: '5932734694',
          TermsAccepted: null,
          Active: true,
          xp: null,
          AvailableRoles: null,
          Locale: null,
          DateCreated: '2025-05-21T09:57:12.693+00:00',
          PasswordLastSetDate: null,
        },
        FromCompanyID: 'BAJAJ_Buyer',
        ToCompanyID: 'BajajAuto-OC',
        FromUserID: 'defaultbuyer',
        BillingAddressID: null,
        BillingAddress: null,
        ShippingAddressID: null,
        Comments: null,
        LineItemCount: 1,
        Status: 'Open',
        DateCreated: '2025-05-31T03:12:50.7+00:00',
        DateSubmitted: '2025-05-31T03:12:52.98+00:00',
        DateApproved: null,
        DateDeclined: null,
        DateCanceled: null,
        DateCompleted: null,
        LastUpdated: '2025-05-31T03:12:53.843+00:00',
        Subtotal: 122500,
        ShippingCost: 0,
        TaxCost: 0,
        PromotionDiscount: 0,
        Currency: null,
        Total: 122500,
        IsSubmitted: true,
        SubscriptionID: null,
        xp: null,
      },
      LineItems: [
        {
          ID: 'd5c4DkT3rU-vrO0qssuVgA',
          ProductID: 'Chetak_3502',
          Quantity: 1,
          BundleItemID: null,
          IsBundle: false,
          DateAdded: '2025-05-31T03:12:51.263+00:00',
          QuantityShipped: 0,
          UnitPrice: 122500,
          PromotionDiscount: 0,
          LineTotal: 122500,
          LineSubtotal: 122500,
          CostCenter: null,
          DateNeeded: null,
          ShippingAccount: null,
          ShippingAddressID: null,
          ShipFromAddressID: null,
          Product: {
            ID: 'Chetak_3502',
            Name: '3502',
            Description: null,
            Returnable: false,
            QuantityMultiplier: 1,
            ShipWeight: null,
            ShipHeight: null,
            ShipWidth: null,
            ShipLength: null,
            DefaultSupplierID: null,
            ParentID: null,
            xp: {
              Range: '153 km',
              TopSpeed: '73 km/h',
              Charger: 'Off board',
              BodyType: 'Steel Body',
              IP67RatedWaterResistance: true,
              ChargingTime: '3 hr 25 min',
              Brakes: 'F - Disc & R - Drum',
              Display: '5 inch TFT',
              BatteryCapacity: '3.5 kWh',
              Colour: [
                {
                  'Indigo Metallic': '#4B0082',
                },
                {
                  'Brooklyn Black': '#0B0B0C',
                },
                {
                  'Matte Charcoal Grey': '#36454F',
                },
                {
                  'Cyber White': '#FFFFFF',
                },
              ],
              Reverse: true,
              SelfCancellingBlinker: 'Unlock with TecPac',
              AutoHazardLight: true,
              CallAcceptReject: true,
              HelmetBox: '35',
              FrontStorage: 'Rear Shield',
              StandardWarranty: '3 Yrs, 50 000 km',
              AdditionalRideModes: ['Eco', 'Sports'],
              MusicControl: true,
              HillHold: true,
              SequentialRearBlinker: false,
              GuideMeHomeLights: true,
              DisplayThemeChange: true,
              AppConnectivity: 'Full Connectivity',
              Navigation: 'TBT',
              RemoteImmobilization: true,
              OverSpeedAlert: true,
              AccidentDetection: true,
              NotificationAlert: true,
              TripDataAnalytics: true,
              DocumentStorage: false,
              GeoFencing: true,
              Images: [
                {
                  Url: 'https://www.chetak.com/-/media/chetakv2/image/header-logo/new/3502.webp',
                },
                {
                  Url: 'https://cdn.bajajauto.com/-/media/chetakv2/content-image/image-series/3502_image.webp',
                },
                {
                  Url: 'https://www.chetak.com/-/media/chetakv2/book-now-v2/3502-booknow/3502-_-web-_-black.webp',
                },
              ],
              AdditionalImages: {
                BackgroundImage:
                  'https://www.chetak.com/-/media/chetakv2/landing-banner/3502/3502---horizontal.webp',
                GeoFacing:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Tec%20Pac%20Feature%20Images/map-desk.png',
                MusicControl:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Tec%20Pac%20Feature%20Images/music-desk.png',
                RemoteImmobilization:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Content Image/Other core Features/3502-out/web/3502-Remote-immobilisation.png',
                HillHold:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Tec%20Pac%20Feature%20Images/Hill-Hold-Assist.webp',
                Display:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Tec%20Pac%20Feature%20Images/digi-docs-desk.png',
                OverSpeedAlert:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Content Image/Other core Features/3502-out/web/3502-Overspeed-alert.png',
                Light:
                  'https://www.chetak.com/series-35/~/media/ChetakV2/Tec%20Pac%20Feature%20Images/2903/2903-Guide.webp',
              },
            },
          },
          Variant: null,
          ShippingAddress: null,
          ShipFromAddress: null,
          SupplierID: null,
          InventoryRecordID: null,
          PriceScheduleID: 'P-Chetak_3502',
          IsOnSale: false,
          PriceOverridden: false,
          Specs: [],
          xp: {
            model: '3502',
            location: '',
            color: 'Indigo Metallic',
            bookingAmount: 2000,
            dealership: 'Chetak Showroom @ Vadodara',
            name: 'D',
            email: 'deepak19ece@gmail.com',
            contact: '900',
          },
        },
      ],
      OrderPromotions: [],
      Subscription: null,
      ShipEstimateResponse: null,
      OrderCalculateResponse: null,
      OrderSubmitResponse: null,
      OrderSubmitForApprovalResponse: null,
      OrderApprovedResponse: null,
      SubscriptionIntegrationResponse: null,
    },
  ] // Add your orders data here

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-lg text-gray-600">No orders found</p>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order?.Order.ID} order={order} />)
      )}
    </div>
  )
}

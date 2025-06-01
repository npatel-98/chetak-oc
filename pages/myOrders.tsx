import React, { useEffect, useState } from 'react'
import { Bike, Clock, IndianRupee } from 'lucide-react'
import { format } from 'date-fns'
import { OrderWorksheetWithXP } from '../ordercloud/redux/xp'
import ImageHelper from '../helper/Image'
import { LineItem } from 'ordercloud-javascript-sdk'
import { useOcDispatch, useOcSelector } from '../ordercloud/redux/ocStore'
import { retrieveAllOrders } from '../ordercloud/redux/ocCurrentOrder'
import { offlineOrders } from '../helper/offlineOrders'

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
                  <p>Model: {item?.xp?.selectedModel}</p>
                  <p>Color: {item?.xp?.selectedColor}</p>
                  <p>Dealership: {item?.xp?.dealer}</p>
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

const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="md:col-span-3">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyOrders() {
  const dispatch = useOcDispatch()
  const ocOrders = useOcSelector((s) => s?.ocCurrentOrder)
  const userEmail = typeof window !== 'undefined' && localStorage.getItem('userEmail')
  const [activeTab, setActiveTab] = useState<'online' | 'offline'>('online')

  useEffect(() => {
    dispatch(retrieveAllOrders(userEmail))
  }, [dispatch])

  const onlineOrders = ocOrders.allOrders?.filter((x) => x?.LineItems?.[0]?.xp?.email === userEmail)

  if (ocOrders.loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        {[1, 2, 3].map((index) => (
          <OrderCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('online')}
            className={`${
              activeTab === 'online'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Online Orders
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`${
              activeTab === 'offline'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Offline Orders
          </button>
        </nav>
      </div>

      {/* Orders List */}
      {activeTab === 'online' ? (
        onlineOrders?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-lg text-gray-600">No online orders found</p>
          </div>
        ) : (
          onlineOrders?.map((order) => <OrderCard key={order?.Order.ID} order={order} />)
        )
      ) : offlineOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-lg text-gray-600">No offline orders found</p>
        </div>
      ) : (
        offlineOrders.map((order) => <OrderCard key={order?.Order.ID} order={order as unknown} />)
      )}
    </div>
  )
}

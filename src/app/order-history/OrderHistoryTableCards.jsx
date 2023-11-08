import React from 'react'
import { Container } from '@/components/Container'
import { gql, grafbase } from '../../lib/grafbase'
import PriceComponent from './PriceComponent'

import { Button } from '@/components/Button'



const getOrderHistory = gql`
  query OrderHistory {
    commercetools {
      orders {
        results {
          totalPrice {
            centAmount
            currencyCode
            fractionDigits
          }
          billingAddress {
            streetName
            streetNumber
            postalCode
            city
            country
          }
          orderState
          paymentState
          customerEmail
        }
      }
    }
  }
`

async function OrderHistoryTableCards() {

    const { commercetools } = await grafbase.request(getOrderHistory)
    console.log(commercetools.orders.results)

    return (
        <section
            id="secondary-features"
            aria-label="Features for building a portfolio"
            className="py-20 sm:py-32"
        >
            <Container>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Orders</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all your orders
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <Button href="#" variant="outline" className="hidden lg:block">
                                Export
                            </Button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Total Price
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Order status
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Payment Status
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {commercetools.orders.results.map((order) => (
                                                <tr key={order.totalPrice}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {order.customerEmail}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><PriceComponent totalPrice={order.totalPrice} /></td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.orderState}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.paymentState}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a href="#" className="text-grey-600 hover:text-grey-900">
                                                            View<span className="sr-only">, {order.orderState}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default OrderHistoryTableCards
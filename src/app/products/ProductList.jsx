import React from 'react'
import Image from 'next/image';
import { gql, grafbase } from '../../lib/grafbase'
import PriceComponent from '../../components/PriceComponent'

const getOrderHistory = gql`
query Commercetools {
    commercetools {
      products {
        results {
          id
          masterData {
            current {
              masterVariant {
                id
                prices {
                  value {
                    centAmount
                    currencyCode
                    fractionDigits
                  }
                }
                images {
                  url
                }
              }
              nameAllLocales {
                value
              }
            }
          }
        }
      }
    }
  }  
`

async function ProductList() {
    const { commercetools } = await grafbase.request(getOrderHistory)

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 id="products-heading" className="sr-only">
                    Products
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-5 md:gap-y-8 lg:gap-x-12">
                    {commercetools.products.results.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="h-56 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 lg:h-72 xl:h-80">
                                <Image
                                    src={product.masterData.current.masterVariant.images[0].url}
                                    alt={product.masterData.current.masterVariant.images[0].url}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                <a href={product.href}>
                                    <span className="absolute inset-0" />
                                    {product.masterData.current.nameAllLocales[0].value}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            <div className="mt-1 text-sm font-medium text-gray-900">
                                <PriceComponent totalPrice={product.masterData.current.masterVariant.prices[0].value} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList
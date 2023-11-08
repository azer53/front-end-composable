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

const products = [
    {
        id: 1,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$13',
        description: '3 sizes available',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 2,
        name: 'Focus Card Holder',
        href: '#',
        price: '$64',
        description: 'Walnut',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
        imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
    },
    {
        id: 3,
        name: 'Focus Carry Case',
        href: '#',
        price: '$32',
        description: 'Heather Gray',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
        imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
    },
    // More products...
]

async function ProductList() {
    const { commercetools } = await grafbase.request(getOrderHistory)
    console.log(commercetools.products.results)
    console.log(commercetools.products.results[0].masterData.current.masterVariant)

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
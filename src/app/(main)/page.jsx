import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { gql, grafbase } from '../../lib/grafbase'



const getAllData = gql`
  query Homepage {
    contentful {
      tileCollection {
        items {
          title
          link
        }
      }
      faqCollection {
        items {
          question
          answer {
            json
          }
        }
      }
    }
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
        }
      }
    }
  }
`


export default async function Home() {
  const { contentful, commercetools } = await grafbase.request(getAllData)
  console.log(contentful)
  console.log(commercetools)

  return (
    <>
      {/*       <Hero />
      <PrimaryFeatures /> */}
      <SecondaryFeatures items={contentful.tileCollection.items} />
      <CallToAction />
      {/*       <Reviews />
      <Pricing /> */}
      <Faqs questions={contentful.faqCollection.items}/>
    </>
  )
}

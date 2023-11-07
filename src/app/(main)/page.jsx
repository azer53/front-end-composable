import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { gql, grafbase } from '../../lib/grafbase'



const GetContentfulData = gql`
  query Contentful {
    contentful {
      productCollection(limit: 6) {
        items {
          name
          summary
        }
      }
    }
  }
`


export default async function Home() {
  const { contentful } = await grafbase.request(GetContentfulData)

  return (
    <>
{/*       <Hero />
      <PrimaryFeatures /> */}
      <SecondaryFeatures items={contentful.productCollection.items} />
      <CallToAction />
{/*       <Reviews />
      <Pricing /> */}
      <Faqs />
    </>
  )
}

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
  }
`


export default async function Home() {
  const { contentful } = await grafbase.request(getAllData)

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

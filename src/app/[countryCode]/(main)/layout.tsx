import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"

function getMetadataBase() {
  try {
    return new URL(getBaseURL())
  } catch (error) {
    console.error('Failed to create metadataBase URL:', error)
    return new URL('https://localhost:8000')
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}

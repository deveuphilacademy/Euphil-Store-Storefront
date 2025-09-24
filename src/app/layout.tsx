import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}

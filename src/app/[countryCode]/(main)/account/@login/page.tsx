import { Metadata } from "next"

import ModernLoginTemplate from "@modules/account/templates/modern-login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

export default function Login() {
  return <ModernLoginTemplate />
}

import { Metadata } from "next"
import ProfileClient from "./profile-client"

export const metadata: Metadata = {
  title: "Profile | Euphil Foods",
  description: "Manage your profile information",
}

export default function ProfilePage() {
  return <ProfileClient />
}

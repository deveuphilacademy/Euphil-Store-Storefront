import { cookies } from "next/headers"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getCustomer } from "@lib/data/customer"
import { prisma } from "@lib/prisma"

export default async function DebugAuthPage() {
  // Get all cookies
  const cookieStore = cookies()
  const medusaJwt = cookieStore.get("_medusa_jwt")
  const allCookies = cookieStore.getAll()
  
  // Get Kinde session
  const { getUser, isAuthenticated } = getKindeServerSession()
  const kindeUser = await getUser()
  const kindeAuth = await isAuthenticated()
  
  // Get Medusa customer
  let medusaCustomer = null
  let medusaError = null
  try {
    medusaCustomer = await getCustomer()
  } catch (error: any) {
    medusaError = error.message
  }
  
  // Get database user
  let dbUser = null
  let dbError = null
  try {
    if (kindeUser?.id) {
      dbUser = await prisma.user.findUnique({
        where: { kinde_id: kindeUser.id }
      })
    }
  } catch (error: any) {
    dbError = error.message
  }
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug Page</h1>
      
      <div className="space-y-8">
        {/* Cookies Section */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <div className="space-y-2">
            <p><strong>_medusa_jwt:</strong> {medusaJwt ? `${medusaJwt.value.substring(0, 20)}...` : "Not set"}</p>
            <details>
              <summary className="cursor-pointer text-blue-600">All cookies ({allCookies.length})</summary>
              <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(allCookies.map(c => ({ name: c.name, value: c.value.substring(0, 20) + "..." })), null, 2)}</pre>
            </details>
          </div>
        </section>
        
        {/* Kinde Auth Section */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Kinde Authentication</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {kindeAuth ? "Yes" : "No"}</p>
            {kindeUser && (
              <>
                <p><strong>ID:</strong> {kindeUser.id}</p>
                <p><strong>Email:</strong> {kindeUser.email}</p>
                <p><strong>Name:</strong> {kindeUser.given_name} {kindeUser.family_name}</p>
                <details>
                  <summary className="cursor-pointer text-blue-600">Full Kinde User</summary>
                  <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(kindeUser, null, 2)}</pre>
                </details>
              </>
            )}
          </div>
        </section>
        
        {/* Database User Section */}
        <section className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Database User</h2>
          <div className="space-y-2">
            {dbError ? (
              <p className="text-red-600">Error: {dbError}</p>
            ) : dbUser ? (
              <>
                <p><strong>ID:</strong> {dbUser.id}</p>
                <p><strong>Email:</strong> {dbUser.email}</p>
                <p><strong>Medusa Customer ID:</strong> {dbUser.medusa_customer_id || "Not set"}</p>
                <details>
                  <summary className="cursor-pointer text-blue-600">Full DB User</summary>
                  <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(dbUser, null, 2)}</pre>
                </details>
              </>
            ) : (
              <p>No database user found</p>
            )}
          </div>
        </section>
        
        {/* Medusa Customer Section */}
        <section className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Medusa Customer</h2>
          <div className="space-y-2">
            {medusaError ? (
              <p className="text-red-600">Error: {medusaError}</p>
            ) : medusaCustomer ? (
              <>
                <p><strong>ID:</strong> {medusaCustomer.id}</p>
                <p><strong>Email:</strong> {medusaCustomer.email}</p>
                <details>
                  <summary className="cursor-pointer text-blue-600">Full Medusa Customer</summary>
                  <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(medusaCustomer, null, 2)}</pre>
                </details>
              </>
            ) : (
              <p>No Medusa customer found (401 Unauthorized)</p>
            )}
          </div>
        </section>
        
        {/* Actions */}
        <section className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <a href="/api/auth/logout" className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout from Kinde
            </a>
            <a href="/api/auth/login" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4">
              Login with Kinde
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

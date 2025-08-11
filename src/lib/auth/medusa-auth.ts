import { sdk } from "@lib/config"

/**
 * Authenticates a Kinde user with Medusa by creating a JWT token directly
 */
export async function authenticateKindeUserWithMedusa(
  email: string,
  medusaCustomerId: string
): Promise<string | null> {
  console.log("[Medusa Auth] Starting authentication for:", { email, medusaCustomerId })
  
  try {
    // First, try to generate a token using the Medusa SDK
    // Since we control both the customer creation and authentication,
    // we can use a consistent password pattern
    const password = `kinde_${email}_secure_pass`
    let loginResponse: Response | null = null
    
    try {
      console.log("[Medusa Auth] Attempting login with direct API call")
      // Use direct API call instead of SDK
      loginResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      
      console.log("[Medusa Auth] Login response status:", loginResponse.status)
      
      if (loginResponse.ok) {
        const responseData = await loginResponse.json()
        console.log("[Medusa Auth] Login response data:", responseData)
        
        // Check if token is in response body
        if (responseData.token) {
          console.log("[Medusa Auth] Got token from response body")
          return responseData.token
        }
        
        // Try to extract JWT from Set-Cookie header
        const setCookieHeader = loginResponse.headers.get('set-cookie')
        console.log("[Medusa Auth] Set-Cookie header:", setCookieHeader)
        
        if (setCookieHeader) {
          // Parse the JWT from the cookie header
          const jwtMatch = setCookieHeader.match(/_medusa_jwt=([^;]+)/)
          if (jwtMatch && jwtMatch[1]) {
            const jwtToken = jwtMatch[1]
            console.log("[Medusa Auth] Extracted JWT token from cookie:", jwtToken.substring(0, 20) + "...")
            return jwtToken
          }
        }
      } else if (loginResponse.status === 401) {
        console.log("[Medusa Auth] Authentication failed - password might be incorrect")
      }
    } catch (loginError: any) {
      console.log("[Medusa Auth] Login failed:", loginError.message)
    }

    // If login fails, we need to reset the password
    // This is a workaround since Medusa doesn't allow direct token generation
    try {
      // Request password reset token
      await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/password-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        body: JSON.stringify({ email }),
      })
      
      // In a production environment, you would handle this differently
      // For now, we'll use the admin API to set a known password
      if (process.env.MEDUSA_API_KEY) {
        console.log("[Medusa Auth] Updating password for customer:", medusaCustomerId)
        const updateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customers/${medusaCustomerId}`,
          {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + process.env.MEDUSA_API_KEY,
              "Content-Type": "application/json",
              "x-medusa-access-token": process.env.MEDUSA_API_KEY
            },
            body: JSON.stringify({
              password: password,
            }),
          }
        )

        console.log("[Medusa Auth] Password update response:", updateResponse.status)
        
        if (updateResponse.ok) {
          console.log("[Medusa Auth] Password updated, attempting login again")
          // Try to login again with the new password
          const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
          
          console.log("[Medusa Auth] Second login attempt status:", loginResponse.status)
          
          if (loginResponse.ok) {
            // Extract JWT from Set-Cookie header
            const setCookieHeader = loginResponse.headers.get('set-cookie')
            console.log("[Medusa Auth] Set-Cookie header after password reset:", setCookieHeader)
            
            if (setCookieHeader) {
              // Parse the JWT from the cookie header
              const jwtMatch = setCookieHeader.match(/_medusa_jwt=([^;]+)/)
              if (jwtMatch && jwtMatch[1]) {
                const jwtToken = jwtMatch[1]
                console.log("[Medusa Auth] Extracted JWT token after password reset:", jwtToken.substring(0, 20) + "...")
                return jwtToken
              }
            }
            
            // If no cookie header, check response body
            const responseData = await loginResponse.json()
            if (responseData.token) {
              return responseData.token
            }
          }
        } else {
          const errorText = await updateResponse.text()
          console.error("[Medusa Auth] Failed to update password:", errorText)
        }
      }
    } catch (error) {
      console.error("Password reset approach failed:", error)
    }

    return null
  } catch (error) {
    console.error("Error authenticating Kinde user with Medusa:", error)
    return null
  }
}

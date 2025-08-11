import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { kindeAuth: string } }) {
  const endpoint = params.kindeAuth;
  
  // Handle the Kinde auth endpoints
  const authHandler = handleAuth();
  const response = await authHandler(request, { params });
  
  // Special handling for the callback endpoint
  if (endpoint === 'kinde_callback') {
    // Check if the response is a redirect (successful auth)
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      console.log('[Kinde Callback] Original redirect location:', location);
      
      // Force redirect to our success route instead of home
      const successUrl = new URL('/api/auth/success', request.url);
      
      // Create a new response that preserves cookies but changes location
      const newResponse = NextResponse.redirect(successUrl.toString());
      
      // Copy all Set-Cookie headers from the original response
      const setCookieHeaders = response.headers.getSetCookie();
      setCookieHeaders.forEach(cookie => {
        newResponse.headers.append('Set-Cookie', cookie);
      });
      
      console.log('[Kinde Callback] Redirecting to success route');
      return newResponse;
    }
  }
  
  return response;
}

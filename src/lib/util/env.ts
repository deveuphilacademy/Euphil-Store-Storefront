export const getBaseURL = () => {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
  
  // Handle null, undefined, or empty string
  if (!baseUrl || baseUrl.trim() === '') {
    console.warn('NEXT_PUBLIC_BASE_URL is empty or undefined, using localhost')
    return "https://localhost:8000"
  }
  
  // Trim whitespace
  baseUrl = baseUrl.trim()
  
  // If the URL doesn't start with http:// or https://, add https://
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`
  }
  
  // Validate the URL format
  try {
    new URL(baseUrl)
    return baseUrl
  } catch (error) {
    console.warn(`Invalid BASE_URL: ${baseUrl}, error: ${error}, falling back to localhost`)
    return "https://localhost:8000"
  }
}

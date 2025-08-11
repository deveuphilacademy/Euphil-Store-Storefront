// Test Medusa admin API authentication
const MEDUSA_BACKEND_URL = "http://localhost:9000";
const MEDUSA_API_KEY = "sk_3d4fc02c97ddf4445e4b89a51ebf63cdf336d3ca9e29a800fa038cc845d59da8";

async function testAuth() {
    console.log("Testing Medusa admin API authentication...");
    
    // Test 1: Bearer token
    console.log("\n1. Testing with Bearer token:");
    try {
        const response1 = await fetch(`${MEDUSA_BACKEND_URL}/admin/customers`, {
            headers: {
                "Authorization": `Bearer ${MEDUSA_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        console.log("Bearer token status:", response1.status);
        if (!response1.ok) {
            const text = await response1.text();
            console.log("Bearer token response:", text);
        }
    } catch (error) {
        console.error("Bearer token error:", error.message);
    }
    
    // Test 2: x-medusa-access-token header
    console.log("\n2. Testing with x-medusa-access-token:");
    try {
        const response2 = await fetch(`${MEDUSA_BACKEND_URL}/admin/customers`, {
            headers: {
                "x-medusa-access-token": MEDUSA_API_KEY,
                "Content-Type": "application/json"
            }
        });
        console.log("x-medusa-access-token status:", response2.status);
        if (!response2.ok) {
            const text = await response2.text();
            console.log("x-medusa-access-token response:", text);
        }
    } catch (error) {
        console.error("x-medusa-access-token error:", error.message);
    }
    
    // Test 3: Basic auth (legacy)
    console.log("\n3. Testing with Basic auth:");
    try {
        const response3 = await fetch(`${MEDUSA_BACKEND_URL}/admin/customers`, {
            headers: {
                "Authorization": `Basic ${MEDUSA_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        console.log("Basic auth status:", response3.status);
        if (!response3.ok) {
            const text = await response3.text();
            console.log("Basic auth response:", text);
        }
    } catch (error) {
        console.error("Basic auth error:", error.message);
    }
    
    // Test 4: API key without prefix
    console.log("\n4. Testing with plain API key:");
    try {
        const response4 = await fetch(`${MEDUSA_BACKEND_URL}/admin/customers`, {
            headers: {
                "Authorization": MEDUSA_API_KEY,
                "Content-Type": "application/json"
            }
        });
        console.log("Plain API key status:", response4.status);
        if (!response4.ok) {
            const text = await response4.text();
            console.log("Plain API key response:", text);
        }
    } catch (error) {
        console.error("Plain API key error:", error.message);
    }
}

testAuth();

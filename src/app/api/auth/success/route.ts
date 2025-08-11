import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";
import {prisma} from "../../../../lib/prisma";

export async function GET() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    let jwtToken: string | null = null; // Declare at the top level

    console.log("Kinde user details:", {
        id: user?.id,
        sub: user?.sub,
        email: user?.email,
        given_name: user?.given_name,
        family_name: user?.family_name
    });

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    // First check if user exists by kinde_id
    let dbUser = await prisma.user.findUnique({
        where: {kinde_id: user.id}
    });

    // If not found by kinde_id, check by kinde_customer_id (sub)
    if (!dbUser && user.sub) {
        dbUser = await prisma.user.findUnique({
            where: {kinde_customer_id: user.sub}
        });
    }

    // If not found by kinde_customer_id, try findFirst with email
    if (!dbUser && user.email) {
        dbUser = await prisma.user.findFirst({
            where: {email: user.email}
        });
    }
    
    console.log("Database user lookup result:", dbUser ? "Found user with ID: " + dbUser.id : "No user found");

    if (!dbUser) {
        try {
            console.log("Creating Medusa customer for user:", user.email);
            console.log("Medusa API Key available:", !!process.env.MEDUSA_API_KEY);
            console.log("Medusa Backend URL:", process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL);
            
            let authToken = null;
            let medusaCustomerData = { customer: { id: null } };
            
            // First, check if customer already exists in Medusa by searching via admin API
            let existingCustomer = null;
            try {
                const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customers?email=${encodeURIComponent(user.email)}`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Basic " + Buffer.from(process.env.MEDUSA_API_KEY + ":").toString("base64"),
                        "Content-Type": "application/json"
                    }
                });
                
                if (searchResponse.ok) {
                    const searchData = await searchResponse.json();
                    console.log("Customer search result:", searchData);
                    if (searchData.customers && searchData.customers.length > 0) {
                        existingCustomer = searchData.customers[0];
                        console.log("Found existing customer:", existingCustomer.id);
                        medusaCustomerData = { customer: existingCustomer };
                    }
                }
            } catch (searchError) {
                console.error("Error searching for customer:", searchError);
            }
            
            // If customer exists, try to login or register an account
            if (existingCustomer) {
                // Try to login first
                const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: `kinde_${user.email}_secure_pass`
                    })
                });
                
                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();
                    authToken = loginData.token;
                    jwtToken = authToken;
                    console.log("Successfully logged in existing customer");
                } else {
                    console.log("Login failed for existing customer, they may not have an account yet");
                    // Customer exists but doesn't have an account (password)
                    // In Medusa v2, we can't set passwords via admin API
                    // The customer will need to use password reset flow
                }
            } else {
                // Customer doesn't exist, try to register
                const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                    },
                    body: JSON.stringify({
                        email: user.email,
                        password: `kinde_${user.email}_secure_pass`
                    })
                });
            
                console.log("Register response status:", registerResponse.status);
                
                if (registerResponse.ok) {
                const registerData = await registerResponse.json();
                authToken = registerData.token;
                console.log("Got auth token from registration:", authToken);
                
                // Extract customer ID from token if available
                if (authToken) {
                    try {
                        // Decode JWT to get customer ID (JWT structure: header.payload.signature)
                        const tokenParts = authToken.split('.');
                        if (tokenParts.length === 3) {
                            const payload = JSON.parse(atob(tokenParts[1]));
                            console.log("JWT payload:", payload);
                            if (payload.customer_id) {
                                medusaCustomerData = { customer: { id: payload.customer_id } };
                            }
                        }
                    } catch (e) {
                        console.error("Error decoding JWT:", e);
                    }
                    
                    // Store the JWT token for later use
                    jwtToken = authToken;
                    
                    // First, get the customer details to find the ID
                    const meResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/me`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
                            "Authorization": `Bearer ${authToken}`
                        }
                    });
                    
                    if (meResponse.ok) {
                        const meData = await meResponse.json();
                        console.log("Got customer data from /me:", meData);
                        if (meData.customer) {
                            medusaCustomerData = meData;
                        }
                    }
                    
                    // Update the customer profile with additional information
                    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/me`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
                            "Authorization": `Bearer ${authToken}`
                        },
                        body: JSON.stringify({
                            first_name: user.given_name,
                            last_name: user.family_name,
                            phone: user.phone_number,
                            metadata: {
                                kinde_id: user.id,
                                kinde_customer_id: user.sub,
                                kinde_email: user.email,
                                kinde_given_name: user.given_name,
                                kinde_family_name: user.family_name,
                                kinde_phone_number: user.phone_number,
                                kinde_picture: user.picture,
                                kinde_metadata: user.metadata,
                            }
                        })
                    });
                    
                    console.log("Update response status:", updateResponse.status);
                    if (updateResponse.ok) {
                        const updateData = await updateResponse.json();
                        console.log("Updated customer data:", updateData);
                        if (updateData.customer) {
                            medusaCustomerData = updateData;
                        }
                    }
                }
            } else {
                // If registration failed, log the error
                const errorText = await registerResponse.text();
                console.error("Registration failed:", errorText);
                
                // Fallback to admin API with Basic auth as you mentioned it worked
                console.log("Falling back to admin API with Basic auth...");
                const adminResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/admin/customers`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Basic " + Buffer.from(process.env.MEDUSA_API_KEY + ":").toString("base64"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.email,
                        first_name: user.given_name,
                        last_name: user.family_name,
                        phone: user.phone_number,
                        metadata: {
                            kinde_id: user.id,
                            kinde_customer_id: user.sub,
                            kinde_email: user.email,
                            kinde_given_name: user.given_name,
                            kinde_family_name: user.family_name,
                            kinde_phone_number: user.phone_number,
                            kinde_picture: user.picture,
                            kinde_metadata: user.metadata,
                        }
                    })
                });
                
                console.log("Admin API response status:", adminResponse.status);
                if (adminResponse.ok) {
                    const adminData = await adminResponse.json();
                    console.log("Admin API customer data:", adminData);
                    medusaCustomerData = adminData;
                    
                    // Now login the user to get JWT token
                    const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/auth/customer/emailpass`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                        },
                        body: JSON.stringify({
                            email: user.email,
                            password: `kinde_${user.email}_secure_pass`
                        })
                    });
                    
                    if (loginResponse.ok) {
                        const loginData = await loginResponse.json();
                        jwtToken = loginData.token;
                        console.log("Got JWT token from login after admin creation");
                    }
                } else {
                    const adminErrorText = await adminResponse.text();
                    console.error("Admin API also failed:", adminErrorText);
                }
                }
            }

            console.log("Attempting to create user in database with data:", {
                id: user.id,
                email: user.email,
                medusa_customer_id: medusaCustomerData?.customer?.id
            });
            
            dbUser = await prisma.user.create({
                data: {
                    id: user.id, // Use Kinde ID as the primary key
                    kinde_id: user.id,
                    first_name: user.given_name ?? "",
                    last_name: user.family_name ?? "",
                    email: user.email ?? "",
                    avatar_url: user.picture ?? "",
                    kinde_customer_id: user.sub || user.id,
                    medusa_customer_id: medusaCustomerData?.customer?.id ?? "",
                    metadata: {
                        kinde_id: user.id,
                        kinde_customer_id: user.sub,
                        kinde_email: user.email,
                        kinde_given_name: user.given_name,
                        kinde_family_name: user.family_name,
                        kinde_phone_number: user.phone_number,
                        kinde_picture: user.picture,
                        kinde_metadata: user.metadata,
                    },
                    phone_number: user.phone_number ?? "",
                } 
            });
            
            console.log("User created successfully in database:", dbUser.id);
        } catch (error: any) {
            console.error("Error in user creation process:", error);
            
            // If it's a unique constraint error, the user already exists
            if (error.code === 'P2002') {
                console.log("User already exists, attempting to find and update...");
                
                // Try to find the existing user
                dbUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { kinde_id: user.id },
                            { kinde_customer_id: user.sub },
                            { email: user.email }
                        ]
                    }
                });
                
                // If found, update with latest Kinde data
                if (dbUser) {
                    dbUser = await prisma.user.update({
                        where: { id: dbUser.id },
                        data: {
                            first_name: user.given_name ?? dbUser.first_name,
                            last_name: user.family_name ?? dbUser.last_name,
                            avatar_url: user.picture ?? dbUser.avatar_url,
                            phone_number: user.phone_number ?? dbUser.phone_number,
                            metadata: {
                                ...dbUser.metadata as object,
                                kinde_picture: user.picture,
                                kinde_metadata: user.metadata,
                                updated_at: new Date().toISOString()
                            }
                        }
                    });
                    
                    // Authenticate with Medusa after update
                    if (dbUser.medusa_customer_id && user.email) {
                        console.log("Authenticating existing user with Medusa after update...");
                        const { authenticateKindeUserWithMedusa } = await import("@lib/auth/medusa-auth");
                        jwtToken = await authenticateKindeUserWithMedusa(
                            user.email,
                            dbUser.medusa_customer_id
                        );
                        
                        if (jwtToken) {
                            console.log("Successfully authenticated existing user with Medusa");
                        } else {
                            console.error("Failed to authenticate existing user with Medusa");
                        }
                    }
                }
            } else {
                // For other errors, throw the error
                throw error;
            }
        }
    } else {
        // User exists, update their information with latest from Kinde
        console.log("Updating existing user with latest Kinde data...");
        
        dbUser = await prisma.user.update({
            where: { id: dbUser.id },
            data: {
                first_name: user.given_name ?? dbUser.first_name,
                last_name: user.family_name ?? dbUser.last_name,
                avatar_url: user.picture ?? dbUser.avatar_url,
                phone_number: user.phone_number ?? dbUser.phone_number,
                // Update kinde_id and kinde_customer_id if they were missing
                kinde_id: user.id,
                kinde_customer_id: user.sub || dbUser.kinde_customer_id || "",
                metadata: {
                    ...dbUser.metadata as object,
                    kinde_picture: user.picture,
                    kinde_metadata: user.metadata,
                    last_login: new Date().toISOString()
                }
            }
        });

        // Log the existing user into Medusa using our authentication utility
        if (dbUser.medusa_customer_id && user.email) {
            console.log("Attempting to authenticate Kinde user with Medusa...");
            const { authenticateKindeUserWithMedusa } = await import("@lib/auth/medusa-auth");
            jwtToken = await authenticateKindeUserWithMedusa(
                user.email,
                dbUser.medusa_customer_id
            );
            
            if (jwtToken) {
                console.log("Successfully authenticated with Medusa");
            } else {
                console.error("Failed to authenticate with Medusa");
            }
        }
    }

    // Redirect to account page after successful authentication
    const baseUrl = process.env.KINDE_SITE_URL || "http://localhost:8000";
    const response = NextResponse.redirect(`${baseUrl}/gb/account`);
    
    // Set the JWT token cookie if we have one
    if (jwtToken) {
        response.cookies.set("_medusa_jwt", jwtToken, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/"
        });
        console.log("JWT token cookie set in redirect response");
    } else {
        console.error("No JWT token to set in cookie");
    }
    
    return response;
}
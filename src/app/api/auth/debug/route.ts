import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // Get Kinde user
        const { getUser, isAuthenticated } = getKindeServerSession();
        const kindeAuthenticated = await isAuthenticated();
        const kindeUser = await getUser();
        
        // Get JWT cookie
        const cookieStore = cookies();
        const jwtCookie = cookieStore.get("_medusa_jwt");
        
        // Get database user if Kinde user exists
        let dbUser = null;
        if (kindeUser?.id) {
            dbUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { kinde_id: kindeUser.id },
                        { kinde_customer_id: kindeUser.sub },
                        { email: kindeUser.email }
                    ]
                }
            });
        }
        
        // Test Medusa connection if JWT exists
        let medusaCustomer = null;
        let medusaError = null;
        if (jwtCookie?.value) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/customers/me`, {
                    headers: {
                        "Authorization": `Bearer ${jwtCookie.value}`,
                        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    medusaCustomer = data.customer;
                } else {
                    medusaError = `${response.status}: ${await response.text()}`;
                }
            } catch (error) {
                medusaError = error instanceof Error ? error.message : "Unknown error";
            }
        }
        
        // Build debug info
        const debugInfo = {
            timestamp: new Date().toISOString(),
            kinde: {
                authenticated: kindeAuthenticated,
                user: kindeUser ? {
                    id: kindeUser.id,
                    sub: kindeUser.sub,
                    email: kindeUser.email,
                    given_name: kindeUser.given_name,
                    family_name: kindeUser.family_name
                } : null
            },
            database: {
                user: dbUser ? {
                    id: dbUser.id,
                    kinde_id: dbUser.kinde_id,
                    kinde_customer_id: dbUser.kinde_customer_id,
                    medusa_customer_id: dbUser.medusa_customer_id,
                    email: dbUser.email,
                    first_name: dbUser.first_name,
                    last_name: dbUser.last_name
                } : null,
                error: dbUser === null && kindeUser ? "User not found in database" : null
            },
            medusa: {
                jwt_cookie_exists: !!jwtCookie?.value,
                jwt_cookie_value: jwtCookie?.value ? `${jwtCookie.value.substring(0, 20)}...` : null,
                customer: medusaCustomer,
                error: medusaError
            },
            environment: {
                NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
                NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? "Set" : "Not set",
                MEDUSA_API_KEY: process.env.MEDUSA_API_KEY ? "Set" : "Not set",
                DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set"
            }
        };
        
        return NextResponse.json(debugInfo, { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}

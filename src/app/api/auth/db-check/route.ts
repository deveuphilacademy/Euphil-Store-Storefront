import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        // Get all users to diagnose the issue
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                kinde_id: true,
                kinde_customer_id: true,
                medusa_customer_id: true,
                created_at: true
            }
        });
        
        // Check for users with empty kinde_customer_id
        const usersWithEmptyKindeCustomerId = allUsers.filter(
            user => user.kinde_customer_id === "" || user.kinde_customer_id === null
        );
        
        // Check for duplicate kinde_customer_ids
        const kindeCustomerIdCounts: Record<string, number> = {};
        allUsers.forEach(user => {
            if (user.kinde_customer_id) {
                kindeCustomerIdCounts[user.kinde_customer_id] = 
                    (kindeCustomerIdCounts[user.kinde_customer_id] || 0) + 1;
            }
        });
        
        const duplicateKindeCustomerIds = Object.entries(kindeCustomerIdCounts)
            .filter(([_, count]) => count > 1)
            .map(([id, count]) => ({ id, count }));
        
        return NextResponse.json({
            totalUsers: allUsers.length,
            users: allUsers,
            diagnostics: {
                usersWithEmptyKindeCustomerId: {
                    count: usersWithEmptyKindeCustomerId.length,
                    users: usersWithEmptyKindeCustomerId
                },
                duplicateKindeCustomerIds: {
                    count: duplicateKindeCustomerIds.length,
                    duplicates: duplicateKindeCustomerIds
                }
            },
            timestamp: new Date().toISOString()
        }, { 
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

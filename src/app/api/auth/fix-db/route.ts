import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        // Get all users with empty or null kinde_customer_id
        const usersToFix = await prisma.user.findMany({
            where: {
                OR: [
                    { kinde_customer_id: "" },
                    { kinde_customer_id: null }
                ]
            }
        });
        
        console.log(`Found ${usersToFix.length} users to fix`);
        
        const updates = [];
        
        for (const user of usersToFix) {
            // For users with kinde_id, use that as kinde_customer_id
            // For users without kinde_id, use their existing id
            const newKindeCustomerId = user.kinde_id || user.id;
            
            console.log(`Updating user ${user.email}: kinde_customer_id from "${user.kinde_customer_id}" to "${newKindeCustomerId}"`);
            
            const updated = await prisma.user.update({
                where: { id: user.id },
                data: {
                    kinde_customer_id: newKindeCustomerId
                }
            });
            
            updates.push({
                id: user.id,
                email: user.email,
                old_kinde_customer_id: user.kinde_customer_id,
                new_kinde_customer_id: newKindeCustomerId
            });
        }
        
        return NextResponse.json({
            message: "Database cleanup completed",
            usersFixed: updates.length,
            updates: updates,
            timestamp: new Date().toISOString()
        }, { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fixing database:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userEmail, medusaCustomerId } = body;
        
        if (!userEmail || !medusaCustomerId) {
            return NextResponse.json({
                error: "Missing userEmail or medusaCustomerId"
            }, { status: 400 });
        }
        
        // Find and update the user
        const user = await prisma.user.findFirst({
            where: { email: userEmail }
        });
        
        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }
        
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                medusa_customer_id: medusaCustomerId
            }
        });
        
        return NextResponse.json({
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                medusa_customer_id: updatedUser.medusa_customer_id
            }
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

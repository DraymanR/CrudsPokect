import connectToDatabase from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
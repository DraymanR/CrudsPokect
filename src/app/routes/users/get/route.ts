import connectToDatabase from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const data = await User.find().lean(); 
        return NextResponse.json({
            methode: 'GET',
            message: "data fetched successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        throw new Error("GET ERROR: " + error);
    }
}
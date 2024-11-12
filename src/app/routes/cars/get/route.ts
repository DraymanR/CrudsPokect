import connectToDatabase from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/Cars";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const data = await Car.find().lean(); 
        return NextResponse.json({
            methode: 'GET',
            message: "cars data fetched successfully",
            data,
        });
    } catch (error) {
        console.error(error);
        throw new Error("GET ERROR: " + error);
    }
}
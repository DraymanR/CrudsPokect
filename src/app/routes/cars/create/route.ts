import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db/mongodb";
import Car from "@/app/lib/models/Cars";


export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const cars = new Car(data);
        await cars.save();
        return NextResponse.json({ message: "Car created successfully", cars }, { status: 201 });
    } catch (error) {
        console.error("Error creating car:", error);
        return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
    }
}
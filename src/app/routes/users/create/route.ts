import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db/mongodb";


export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const user = new User(data);
        await user.save();
        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
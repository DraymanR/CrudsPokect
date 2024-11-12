import connectToDatabase from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/User";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
 try {
 await connectToDatabase();
 const { id } = params;
 const data = await request.json();

 const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

 if (!updatedUser) {
 return NextResponse.json({ error: "User not found" }, { status: 404 });
 }

 return NextResponse.json({ message: "User updated successfully", updatedUser }, { status: 200 });
 } catch (error) {
 console.error("Error updating user:", error);
 return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
 }
}

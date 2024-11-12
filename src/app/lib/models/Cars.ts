import mongoose, { Model, Schema } from "mongoose"
import { ICar } from "@/app/types/cars";

const CarSchema: Schema<ICar> = new Schema({
    // _id: { type: String, required: false },
    // _id: { type: String, required: true },
    company: { type: String, required: true },
    color: { type: String, required: true },
    modelCar: { type: String, required: true },
})

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema)

export default Car
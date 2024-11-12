import mongoose, { Model, Schema } from "mongoose"
import { IBook } from "@/app/types/books";

const BookSchema: Schema<IBook> = new Schema({
    // _id: { type: String, required: false },
    company: { type: String, required: true },
    color: { type: String, required: true },
    modelCar: { type: String, required: true },
})

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema)

export default Book
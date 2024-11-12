import mongoose, { Model, Schema } from "mongoose"
import { IUser } from "@/app/types/users";
// import { IAddress } from "@/app/types/users";

const UserSchema: Schema<IUser> = new Schema({
    // username: { type: String, required: true },
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // image: string;
    age: { type: Number, required: true },
    // address: { type: IAddress, required: true }
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
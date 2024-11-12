import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    // image: string;
    age: number;
    // address: IAddress;
}
// export type IAddress = {
//     city: string;
//     state: string;
// }
export interface UsersList {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}

export interface UsersResponse {
    mathode: string;
    mesage: UsersList;
    data: IUser[];
}
export interface UserFormData {
    firstName: string;
    lastName: string;
    age: number;
}




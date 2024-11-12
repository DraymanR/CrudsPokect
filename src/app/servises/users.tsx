import axios from "axios";
import { UserFormData, UsersResponse } from "../types/users";
// import User from "../lib/models/User";

export const getUsers = async (): Promise<UsersResponse> => {
    const response = await axios.get<UsersResponse>('http://localhost:3000/routes/users/get');
    console.log(response.data.data);
    console.log("getUsers()");


    return response.data;
}

export const createUser = async (userData: UserFormData) => {
    try {
        const response = await axios.post("http://localhost:3000/routes/users/create", userData);
        return response.data;
    } catch (error) {
        console.error("Failed to create user:", error);
        throw new Error("Failed to create user");
    }
};

// export const createUser = async (userData: UserFormData) => {
//     try {
//         const response = await User.create("http://localhost:3000/routes/users/create", userData);
//         return response.data;
//     } catch (error) {
//         console.error("Failed to create user:", error);
//         throw new Error("Failed to create user");
//     }
// };
export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3000/routes/users/delete/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete user:", error);
        throw new Error("Failed to delete user");
    }
};
export const updateUser = async (userId: string, userData: Partial<UserFormData>) => {
    try {
        const response = await axios.put(`http://localhost:3000/routes/users/update/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw new Error("Failed to update user");
    }
};


'use client';

import { useEffect, useState } from "react";
import { getUsers } from "@/app/servises/users";
import { IUser } from "@/app/types/users";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/app/servises/users";
import { updateUser } from "@/app/servises/users";

const ShowUsersList = () => {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState({ firstName: "", lastName: "", age: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                setUsers(data.data);
            } catch (err) {
                setError("Failed to fetch users");
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleAddUser = () => {
        router.push("/pages/users/add");
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter((user) => user._id !== userId)); // Update the list locally
        } catch (err) {
            console.error("Failed to delete user:", err);
            setError("Failed to delete user");
        }
    };

    const handleEditClick = (user: IUser) => {
        setEditingUserId(user._id);
        setEditFormData({ firstName: user.firstName, lastName: user.lastName, age: user.age });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateUser = async (userId: string) => {
        try {
            await updateUser(userId, editFormData);
            // const z=users.map((user) => (user._id === userId ? { editFormData } : user))
            // const z = users.map((user) =>
            //     user._id === userId ? { ...user, ...editFormData } : user
            // );
            const z = users.map((user) =>
                user._id === userId
                    ? { ...user, ...editFormData } as IUser // Ensure this matches IUser
                    : user
            );
            setUsers(z);
            setEditingUserId(null);
        } catch (err) {
            console.error("Failed to update user:", err);
            setError("Failed to update user");
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
                Add New User
            </button>
            <ul className="space-y-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user._id} className="p-4 border rounded shadow">
                            {editingUserId === user._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editFormData.firstName}
                                        onChange={handleEditChange}
                                        placeholder="First Name"
                                        className="border p-1 mr-2"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editFormData.lastName}
                                        onChange={handleEditChange}
                                        placeholder="Last Name"
                                        className="border p-1 mr-2"
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        value={editFormData.age}
                                        onChange={handleEditChange}
                                        placeholder="Age"
                                        className="border p-1 mr-2"
                                    />
                                    <button
                                        onClick={() => handleUpdateUser(user._id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white px-2 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <strong>First Name:</strong> {user.firstName}<br />
                                    <strong>Last Name:</strong> {user.lastName}<br />
                                    <strong>Age:</strong> {user.age}<br />
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mt-2 mr-2 hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No users available</p>
                )}
            </ul>
        </div>
    );
};

export default ShowUsersList;

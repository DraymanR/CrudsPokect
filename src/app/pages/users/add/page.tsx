'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from '@/app/servises/users';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: 0
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // await createUser(formData)
            console.log("Creating user with data:", formData);
            await createUser(formData);
            console.log("User created successfully");            
            router.push("/pages/users");
        } catch (err) {
            console.error(err);
            setError("Failed to create user");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New User</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        className="p-4 border rounded shadow"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                       className="border p-1 mr-2"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div >
                    <label>Age:</label>
                    <input
                        className="p-4 border rounded shadow"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600" type="submit">Add User</button>
            </form>
        </div>
    );
};

export default CreateUser;

'use client';

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { createCar } from "@/app/servises/cars";

const CreateCar = () => {
    const [formData, setFormData] = useState({
        company: "",
        color: "",
        modelCar: ''
    });
    const [error, setError] = useState<string | null>(null);
    // const router = useRouter();

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
            await createCar(formData);
            // router.push("/pages/users");
        } catch (err) {
            console.error(err);
            setError("Failed to create car");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>company:</label>
                    <input
                        className="p-4 border rounded shadow"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Color:</label>
                    <input
                       className="border p-1 mr-2"
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div >
                    <label>modelCar:</label>
                    <input
                        className="p-4 border rounded shadow"
                        type="text"
                        name="modelCar"
                        value={formData.modelCar}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600" type="submit">Add Car</button>
            </form>
        </div>
    );
};

export default CreateCar;

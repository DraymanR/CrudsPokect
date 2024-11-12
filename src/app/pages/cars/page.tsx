'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICar } from "@/app/types/cars";
import { deleteCar, getCars, updateCar } from "@/app/servises/cars";

const ShowCarsList = () => {
    const router = useRouter();
    const [cars, setCars] = useState<ICar[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingCarId, setEditingCarId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState({ company: "", color: "", modelCar: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCars();
                setCars(data.data);
            } catch (err) {
                setError("Failed to fetch cars");
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleAddCar = () => {
        router.push("/pages/cars/add");
    };

    const handleDeleteCar = async (carId: string) => {
        try {
            await deleteCar(carId);
            setCars(cars.filter((car) => car._id !== carId)); // Update the list locally
        } catch (err) {
            console.error("Failed to delete car:", err);
            setError("Failed to delete car");
        }
    };

    const handleEditClick = (car: ICar) => {
        // setEditingCarId(car._id);
        setEditFormData({ company: car.company, color: car.color, modelCar: car.modelCar });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateCar = async (carId: string) => {
        try {
            await updateCar(carId, editFormData);
            const z = cars.map((car) =>
                car._id === carId
                    ? { ...car, ...editFormData } as ICar // Ensure this matches ICar
                    : car
            );
            setCars(z);
            setEditingCarId(null);
        } catch (err) {
            console.error("Failed to update car:", err);
            setError("Failed to update car");
        }
    };

    const handleCancelEdit = () => {
        setEditingCarId(null);
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Cars List</h1>
            <button onClick={handleAddCar} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
                Add New Car
            </button>
            <ul className="space-y-4">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <li key={car._id} className="p-4 border rounded shadow">
                            {editingCarId === car._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="company"
                                        value={editFormData.company}
                                        onChange={handleEditChange}
                                        placeholder="company"
                                        className="border p-1 mr-2"
                                    />
                                    <input
                                        type="text"
                                        name="color"
                                        value={editFormData.color}
                                        onChange={handleEditChange}
                                        placeholder="color"
                                        className="border p-1 mr-2"
                                    />
                                    <input
                                        type="number"
                                        name="modelCar"
                                        value={editFormData.modelCar}
                                        onChange={handleEditChange}
                                        placeholder="modelCar"
                                        className="border p-1 mr-2"
                                    />
                                    <button
                                        onClick={() => handleUpdateCar(car._id)}
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
                                    <strong>company:</strong> {car.company}<br />
                                    <strong>color:</strong> {car.color}<br />
                                    <strong>modelCar:</strong> {car.modelCar}<br />
                                    <button
                                        onClick={() => handleDeleteCar(car._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(car)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mt-2 mr-2 hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No cars available</p>
                )}
            </ul>
        </div>
    );
};

export default ShowCarsList;

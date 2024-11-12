import axios from "axios";
import { CarFormData, CarsResponse } from "../types/cars";

export const getCars = async (): Promise<CarsResponse> => {
    const response = await axios.get<CarsResponse>('http://localhost:3000/routes/cars/get');
    console.log(response.data.data);
    console.log("getCars()");


    return response.data;
}

export const createCar = async (carData: CarFormData) => {
    try {
        const response = await axios.post("http://localhost:3000/routes/cars/create", carData);
        return response.data;
    } catch (error) {
        console.error("Failed to create car:", error);
        throw new Error("Failed to create car");
    }
};
// createCar({
//     company: "taiota",
//     color: "red",
//     modelCar: "ax1"
// })
export const deleteCar = async (carId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3000/routes/cars/delete/${carId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete car:", error);
        throw new Error("Failed to delete car");
    }
};

export const updateCar = async (carId: string, carData: Partial<CarFormData>) => {
    try {
        const response = await axios.put(`http://localhost:3000/routes/cars/update/${carId}`, carData);
        return response.data;
    } catch (error) {
        console.error("Failed to update car:", error);
        throw new Error("Failed to update car");
    }
};


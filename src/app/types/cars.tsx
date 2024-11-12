import { Document } from "mongoose";

export interface ICar extends Document {
    // _id: string;
    company: string;
    color: string;
    modelCar: string;
}

export interface CarsList {
    cars: ICar[];
    total: number;
    skip: number;
    limit: number;
}

export interface CarsResponse {
    mathode: string;
    mesage: string;
    data: ICar[];
}

export interface CarFormData {
    company: string;
    color: string;
    modelCar: string;
}




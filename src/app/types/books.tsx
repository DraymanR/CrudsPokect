import { Document } from "mongoose";

export interface IBook extends Document {
    // _id: string;
    company: string;
    color: string;
    modelCar: string;
}

export interface CarsList {
    books: IBook[];
    total: number;
    skip: number;
    limit: number;
}

export interface CarsResponse {
    mathode: string;
    mesage: string;
    data: IBook[];
}

export interface CarFormData {
    company: string;
    color: string;
    modelCar: string;
}

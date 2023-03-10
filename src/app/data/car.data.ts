import {Car} from "../models/car.model";

export const carData: Car[] = [
    {
        plate: '2FMDK3',
        brand: 'Volvo',
        model: '960',
        color: 'Violet',
    },
    {
        plate: '1GYS4C',
        brand: 'Saab',
        model: '9-3',
        color: 'Purple',
    },
    {
        plate: '1GKS1E',
        brand: 'Ford',
        model: 'Ranger',
        color: 'Indigo',
    },
    {
        plate: '1G6AS5',
        brand: 'Volkswagen',
        model: 'Golf',
        color: 'Aquamarine',
    },
]
export const parkedCarData: Car[] = [
    {
        plate: 'FF3FDC',
        brand: 'Mercedes',
        model: 'SLS',
        color: 'Black',
    }
]

export const INIT_FAKE_DELAY = 1000;
export const FAKE_DELAY = 600;

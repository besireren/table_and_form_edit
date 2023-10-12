export interface Car {
    id:number;
    carName:string | null;
    instock:boolean | null;
    horsePower:number | null;
    price:number | null;
    color:number | null;
}
export interface Color {
    id: number,
    name: string,
    code: string
}
export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
    hobbies: Hobby[]
}

export interface Hobby {
    name: string;
    skill: number;
}

export interface Address {
    street: string;
    city: string;
    country: string;

}
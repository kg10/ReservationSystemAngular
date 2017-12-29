export class Address {
    id: number;
    city: string;
    street: string;
    numberStreet: number;
    postalCode: string;
    personnelId: number;
    constructor(id: number, city: string, street: string, numberStreet: number, postalCode: string, personnelId: number) {
        this.id = id;
        this.city = city;
        this.street = street;
        this.numberStreet = numberStreet;
        this.postalCode = postalCode;
        this.personnelId = personnelId;

    }
}
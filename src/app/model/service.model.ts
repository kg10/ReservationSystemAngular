import { Timestamp } from "rxjs/operator/timestamp";

export class Service {
    id: number;
    descriptionService: string;
    duration: string;
    price: any;
    constructor(_descriptionService: string, _duration: string, _price: any) {
        this.descriptionService = _descriptionService;
        this.duration = _duration;
        this.price = _price;
    }
}
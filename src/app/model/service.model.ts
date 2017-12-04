import { Timestamp } from "rxjs/operator/timestamp";

export class Service {
    id: number;
    descriptionService: string;
    duration: any;
    price: any;
    constructor(_descriptionService: string, _duration: any, _price: any) {
        this.descriptionService = _descriptionService;
        this.duration = _duration;
        this.price = _price;
    }
}
import { Reservation } from "./reservation.model";

export class ReservationResponse{
    loginClient: String;
    idPersonnel: number;
    idService: number;
    reservation: Reservation;

    set Reservation(value : Reservation) {
        //console.log("Set FirstName : ", value);
        this.reservation = value;
    } 
}
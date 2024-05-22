import { Subscription } from "rxjs";

export interface subscripcionPack{
    id_ingreso: string,
    sensores: Subscription[]
}
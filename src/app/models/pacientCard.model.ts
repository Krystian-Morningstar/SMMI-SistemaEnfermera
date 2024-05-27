import { Subscription } from "rxjs"

export interface informacion{
      id_ingreso: string,
      nombres: string,
      apellidos: string,
      id_habitacion: number,
      nombre_habitacion: string,
      oxig: {
            alerta: boolean,
            valor: number
      },
      freqCard: {
            alerta: boolean,
            valor: number
      },
      presArtsist: {
            alerta: boolean,
            valor: number
      },
      presArtdiast: {
            alerta: boolean,
            valor: number
      },
      tempCorp: {
            alerta: boolean,
            valor: number
      },
      alarm: boolean
}
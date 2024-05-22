import { Subscription } from "rxjs"

export interface informacion{
      id_ingreso: string,
      nombres: string,
      apellidos: string,
      id_habitacion: number,
      nombre_habitacion: string,
      oxig: number,
      freqCard: number,
      presArtsist: number,
      presArtdiast: number,
      tempCorp: number
      // oxig:{
      //       nombre: "Oxigenacion",
      //       topico: "/oxig",
      //       unidad_medida: "rpm"
      //       valor: 0
      // },
      // freqCard:{
      //       nombre: "Frecuencia Cardiaca",
      //       topico: "/freqCard",
      //       unidad_medida: "bpm"
      //       valor: 0
      // },
      // presArtsist:{
      //       nombre: "Presion Arterial Sistolica",
      //       topico: "/presArtsist",
      //       unidad_medida: "mmHg",
      //       valor: 0
      // },
      // presArtdiast:{
      //       nombre: "Presion Arterial Diastolica",
      //       topico: "/presArtdiast",
      //       unidad_medida: "mmHg",
      //       valor: 0
      // },
      // tempCorp:{
      //       nombre: "Temperatura Corporal",
      //       topico: "/tempCorp",
      //       unidad_medida: "°C",
      //       valor: 0
      // }
}
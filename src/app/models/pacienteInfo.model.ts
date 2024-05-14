export interface informacion{
      id_ingreso: string,
      fecha_ingreso: string,
      hora_ingreso: string,
      nombres: string,
      apellidos: string,
      sexo: string,
      edad: number,
      padecimientos: string,
      alergias: string,
      causa_ingreso: string,
      de_alta: boolean,
      id_especialidad: {
          descripcion: string,
          nombre: string,
          id: number
      },
      id_habitacion: number,
      nombre_habitacion: string,
      ocupado: boolean
      oxig:{
            id: 1,
            nombre: "Oxigenacion",
            topico: "/oxig",
            unidad_medida: "rpm"
            valor: 0
      },
      freqCard:{
            id: 2,
            nombre: "Frecuencia Cardiaca",
            topico: "/freqCard",
            unidad_medida: "bpm"
            valor: 0
      },
      presArtsist:{
            id: 3,
            nombre: "Presion Arterial Sistolica",
            topico: "/presArtsist",
            unidad_medida: "mmHg",
            valor: 0
      },
      presArtdiast:{
            id: 4,
            nombre: "Presion Arterial Diastolica",
            topico: "/presArtdiast",
            unidad_medida: "mmHg",
            valor: 0
      },
      tempCorp:{
            id: 5,
            nombre: "Temperatura Corporal",
            topico: "/tempCorp",
            unidad_medida: "°C",
            valor: 0
      }
}
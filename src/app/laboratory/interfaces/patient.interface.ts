export interface Patient {
  id?:                   string;
  foto?:                 string;
  nombre?:               null | string;
  edad?:                 number;
  fecha?:                Date;
  solicitud?:            string;
  estado?:               null;
  id_paciente?:          number;
  id_laboratorios_paciente?: number;
}


/// subida de laboratorio
export interface LabResponse {
    ok:      boolean;
    message: string;
    data:    Data;
}
export interface Data {
  id:                     string;
  id_fichamedica:         string;
  id_laboratorios:        string;
  id_laboratorio_empresa: number;
  id_archivolaboratorios: number;
  descripcion:            string;
  estado:                 string;
  archivo:                Archivo;
}
export interface Archivo {
  id:      number;
  fecha:   Date;
  archivo: string;
}

//respuesta al modificar el estado

export interface AuthResponse {
  ok:      boolean;
  message: string;
  data:    Data;
}

export interface Data {
  id:                     string;
  id_paciente:            string;
  id_laboratorio_empresa: number;
  id_archivolaboratorios: number;
  creado:                 Date;
  modificado:             Date;
  estado:                 string;
}

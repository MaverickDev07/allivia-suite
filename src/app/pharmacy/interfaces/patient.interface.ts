
export interface FarResponse {
  ok:      boolean;
  message: string;
  data:    Patient[];
}
export interface Patient {
  id:              number;
  foto:            string;
  nombre:          string;
  edad:            number;
  fecha_envio:     Date;
  solicitud:       string;
  estado:          null;
  id_agendacita:   number;
  id_paciente:     number;
  id_detalleenvio: number;
}

/* detalle farmacia */

export interface AuthResponse {
  ok:      boolean;
  message: string;
  data:    DataDetails;
}

export interface DataDetails {
  id:                number;
  pacienteId:        number;
  doctorId:          number;
  tipocitaId:        number;
  pagoId:            number;
  tipoconsultaId:    number;
  especialidadId:    number;
  fecha:             Date;
  inicioconsulta:    string;
  finconsulta:       string;
  estadoconsulta:    string;
  motivoconsulta:    string;
  precio:            number;
  motivocancelacion: null;
  tipoespecialidad:  null;
  horario:           string;
  reconsulta:        boolean;
  fecharegistro:     Date;
  nit_comprador:     null;
  razon_social:      null;
  tipo_agenda:       null;
  paciente:          Paciente;
  doctor:            Doctor;
  fichamedica:       Fichamedica[];
  detalleenvio:      Detalleenvio;
  ordenCompra:       OrdenCompra;
}

export interface Detalleenvio {
  id:              number;
  creado:          Date;
  modificado:      Date;
  direccion_envio: string;
  indicacion:      null;
  latitud:         null;
  longitud:        null;
  numero_casa:     string;
  telefono:        string;
  agendacitaId:    number;
  entidadmedicaId: number;
  estado:          string;
}

export interface Doctor {
  id:                     number;
  usuarioId:              number;
  descripcion:            string;
  pais:                   string;
  adjunto:                null;
  recomendacion:          null;
  biografia:              null;
  pacientes:              string;
  experiencia:            null;
  path:                   null;
  nombrearchivo:          null;
  tipo_doctor:            null;
  firma:                  string;
  usuario:                Usuario;
  doctoresespecialidades: Doctoresespecialidade[];
}

export interface Doctoresespecialidade {
  id:             number;
  doctorId:       number;
  especialidadId: number;
  especialidad:   Especialidad;
}

export interface Especialidad {
  id:          number;
  descripcion: string;
  eliminado:   boolean;
}

export interface Usuario {
  usuario_id:            number;
  descricpion:           string;
  email:                 string;
  nombre:                string;
  apellido:              string;
  carnet:                string;
  fecha_nacimiento:      Date;
  path:                  string;
  usuario:               string;
  pin_password:          string;
  estado:                string;
  creado:                Date;
  creado_por:            string;
  modificado:            Date | null;
  modificado_por:        null | string;
  reestablecer_password: null;
  grupo_id:              null;
  fecha_fin:             null;
  tipo_autenticacion_id: number;
  password_valido_hasta: null;
  genero:                string;
  direccion:             null;
  telefono:              null | string;
  nombrearchivo:         string;
  id_device:             string;
  revision:              boolean;
  token:                 null;
  access_token:          string;
}

export interface Fichamedica {
  id:                number;
  agendacitaId:      number;
  programafaseId:    null;
  fichamedicamentos: Fichamedicamento[];
  fichadiagnostico:  Fichadiagnostico[];
}

export interface Fichadiagnostico {
  id:            number;
  fichamedicaId: number;
  descripcion:   string;
}

export interface Fichamedicamento {
  id:                 number;
  fichamedicaId:      number;
  medicamentoId:      number | null;
  nombre_medicamento: string;
  indicaciones:       string;
  tratamiento:        boolean;
  duracion:           string;
  dosis:              string;
  cantidad:           number;
  medicamento:        Medicamento | null;
}

export interface Medicamento {
  id:       number;
  grupo:    string;
  producto: string;
  precio:   number;
}

export interface OrdenCompra {
  descuento:    number;
  total:        number;
  medicamentos: MedicamentoElement[];
}

export interface MedicamentoElement {
  id:          number;
  grupo:       string;
  medicamento: string;
  dosis:       string;
  cantidad:    number;
  precio:      number;
}

export interface Paciente {
  id:          number;
  usuarioId:   number;
  descripcion: string;
  usuario:     Usuario;
}

/// respuesta del server al enviar el orden de la compra
export interface FarResponse {
  ok:      boolean;
  message: string;
  dataresp:    Data;
}

export interface Data {
  id:            number;
  fichamedicaId: number;
  descuento:     number;
  total:         number;
  medicamentos:  Medicamento[];
}

export interface Medicamento {
  id:          number;
  grupo:       string;
  medicamento: string;
  dosis:       string;
  cantidad:    number;
  precio:      number;
}

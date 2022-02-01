import { Respuesta } from './respuesta.interface';

export interface Usuario {
  idUsuario: number | null;
  nombre: string;
  apellido: string;
  email: string;
  clave: string;
  idPerfil: number | null;
  habilitado: boolean | null;
  perfil: string | null;
}

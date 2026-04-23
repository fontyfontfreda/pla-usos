// usuari.model.ts
export class Usuari {
  usuari: string;
  contrasenya: string;
  rol: number;
  rol_descripcio: string;

  constructor(
    usuari: string,
    contrasenya: string,
    rol: number,
    rol_descripcio: string
  ) {
    this.usuari = usuari;
    this.contrasenya = contrasenya;
    this.rol = rol;
    this.rol_descripcio = rol_descripcio;
  }
}

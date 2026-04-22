// usuari.model.ts
export class Usuari {
  usuari: string;
  contrasenya: string;
  rol: number;

  constructor(
    usuari: string,
    contrasenya: string,
    rol: number
  ) {
    this.usuari = usuari;
    this.contrasenya = contrasenya;
    this.rol = rol;
  }
}

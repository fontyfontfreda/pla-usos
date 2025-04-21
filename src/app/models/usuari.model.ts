// usuari.model.ts
export class Usuari {
  usuari: string;
  contrasenya: string;

  constructor(
    usuari: string,
    contrasenya: string
  ) {
    this.usuari = usuari;
    this.contrasenya = contrasenya;
  }
}

// rol.model.ts
export class Rol {
  codi: number;
  descripcio: string;

  constructor(
    codi: number,
    descripcio: string
  ) {
    this.codi = codi;
    this.descripcio = descripcio;
  }
}

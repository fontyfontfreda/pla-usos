// epigraf.model.ts
export class Epigraf {
  id: number;
  codi1: number;
  codi2: number;
  codi3: number;
  descripcio: string;
  mostrar: boolean;

  constructor(
    id: number,
    codi1: number,
    codi2: number,
    codi3: number,
    descripcio: string,
    mostrar: boolean
  ) {
    this.id = id;
    this.codi1 = codi1;
    this.codi2 = codi2;
    this.codi3 = codi3;
    this.descripcio = descripcio;
    this.mostrar = mostrar;
  }
}

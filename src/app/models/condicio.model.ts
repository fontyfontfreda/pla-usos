// condicio.model.ts
export class Condicio {
  id: number;
  descripcio: string;
  valor: string | null;


  constructor(
    id: number,
    descripcio: string,
    valor: string | null
  ) {
    this.id = id;
    this.descripcio = descripcio;
    this.valor = valor;
  }
}

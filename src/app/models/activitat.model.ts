// activitat.model.ts
export class Activitat {
  codi_grup: number;
  descripcio_grup: string;
  codi_subgrup: number;
  descripcio_subgrup: string;
  codi_descripcio_activitat: number;
  descripcio_descripcio_activitat: string;


  constructor(
    codi_grup: number,
    descripcio_grup: string,
    codi_subgrup: number,
    descripcio_subgrup: string,
    codi_descripcio_activitat: number,
    descripcio_descripcio_activitat: string,

  ) {
    this.codi_grup = codi_grup;
    this.descripcio_grup = descripcio_grup;
    this.codi_subgrup = codi_subgrup;
    this.descripcio_subgrup = descripcio_subgrup;
    this.codi_descripcio_activitat = codi_descripcio_activitat;
    this.descripcio_descripcio_activitat = descripcio_descripcio_activitat;
  }
}

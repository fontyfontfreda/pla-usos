import { Condicio } from "./condicio.model";

// activitat.model.ts
export class Activitat {
  codi_grup: number;
  descripcio_grup: string;
  codi_subgrup: number;
  descripcio_subgrup: string;
  codi_descripcio_activitat: number;
  descripcio_descripcio_activitat: string;
  descripcio_activitat: string | null  = null;
  is_altres: boolean = false;
  condicions: Condicio[];

  constructor(
    codi_grup: number,
    descripcio_grup: string,
    codi_subgrup: number,
    descripcio_subgrup: string,
    codi_descripcio_activitat: number,
    descripcio_descripcio_activitat: string,
    condicions: Condicio[]
  ) {
    this.codi_grup = codi_grup;
    this.descripcio_grup = descripcio_grup;
    this.codi_subgrup = codi_subgrup;
    this.descripcio_subgrup = descripcio_subgrup;
    this.codi_descripcio_activitat = codi_descripcio_activitat;
    this.descripcio_descripcio_activitat = descripcio_descripcio_activitat;
    this.condicions = condicions;
  }
}

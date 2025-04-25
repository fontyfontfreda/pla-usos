// consulta.model.ts
export class Consulta {
  id: number;
  dni_interessat: string;
  nom_interessat: string;
  actuacio_interessat: string;
  adreca: string;
  is_altres: number;
  grup: string;
  subgrup: string;
  activitat: string;
  descripcio_altres: string;
  is_valid: number;
  condicio: string;
  valor_condicio: number;
  data: string;


  constructor(
    id: number,
    dni_interessat: string,
    nom_interessat: string,
    actuacio_interessat: string,
    adreca: string,
    is_altres: number,
    grup: string,
    subgrup: string,
    activitat: string,
    descripcio_altres: string,
    is_valid: number,
    condicio: string,
    valor_condicio: number,
    data: string
  ) {
    this.id = id;
    this.dni_interessat = dni_interessat;
    this.nom_interessat = nom_interessat;
    this.actuacio_interessat = actuacio_interessat;
    this.adreca = adreca;
    this.is_altres = is_altres;
    this.grup = grup;
    this.subgrup = subgrup;
    this.activitat = activitat;
    this.descripcio_altres = descripcio_altres;
    this.is_valid = is_valid;
    this.condicio = condicio;
    this.valor_condicio = valor_condicio;
    this.data = data;
  }
}

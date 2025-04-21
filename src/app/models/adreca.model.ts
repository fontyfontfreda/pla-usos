// adreca.model.ts
export class Adreca {
  DOMCOD: number;
  adreca: string;
  nucli_cod: string;
  codi_carrer: number;
  carrer: string;
  numero: string;
  bis?: string;
  pis?: string;
  porta?: string;
  tipus_dom?: string;
  tipus_loc?: string;
  amplada_carrer?: number;
  coord_x: number;
  coord_y: number;
  zona_id: number;
  codi_zona: string;
  area_tractament_id?: number;
  codi_area?: string;
  tipus_carrer_id: number;
  imatge?: string;

  constructor(
    DOMCOD: number,
    adreca: string,
    nucli_cod: string,
    codi_carrer: number,
    carrer: string,
    numero: string,
    coord_x: number,
    coord_y: number,
    zona_id: number,
    codi_zona: string,
    tipus_carrer_id: number,
    bis?: string,
    pis?: string,
    porta?: string,
    tipus_dom?: string,
    tipus_loc?: string,
    amplada_carrer?: number,
    area_tractament_id?: number,
    codi_area?: string,
    imatge?: string
  ) {
    this.DOMCOD = DOMCOD;
    this.adreca = adreca;
    this.nucli_cod = nucli_cod;
    this.codi_carrer = codi_carrer;
    this.carrer = carrer;
    this.numero = numero;
    this.coord_x = coord_x;
    this.coord_y = coord_y;
    this.zona_id = zona_id;
    this.codi_zona = codi_zona;
    this.tipus_carrer_id = tipus_carrer_id;
    this.bis = bis;
    this.pis = pis;
    this.porta = porta;
    this.tipus_dom = tipus_dom;
    this.tipus_loc = tipus_loc;
    this.amplada_carrer = amplada_carrer;
    this.area_tractament_id = area_tractament_id
    this.codi_area = codi_area;
    this.imatge = imatge;
  }
}

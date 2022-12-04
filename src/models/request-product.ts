export interface RequestProduct{
  Codigo : string;
  Farmacia : string;
  Nombres : string;
  Ubigeo : string;
  Total : string;
  Telefono : string;
  Estado : string;
  FechaRegistro : string;
}

export interface RequestProductDetail{
  Codigo: string;
  Farmacia: string;
  Farmaco: string;
  Presentacion: string;
  Cantidad: string;
  Precio: string;
  ftotal: string;
}



import { v4 as uuid } from 'uuid';
import { Precio } from '../value-objects/precio.vo';
import { EstadoOferta } from '../value-objects/enums';

export class Oferta {
  public readonly ofertaId: string;

  constructor(
    public readonly anuncioId: string,
    public readonly compradorId: string,
    public readonly precioOfertado: Precio,
    public readonly mensaje?: string,
    public estado: EstadoOferta = EstadoOferta.PENDIENTE,
    public readonly fechaCreacion: Date = new Date(),
    ofertaId?: string,
  ) {
    this.ofertaId = ofertaId || uuid();
  }

  aceptar(): void {
    if (this.estado !== EstadoOferta.PENDIENTE)
      throw new Error('Solo se pueden aceptar ofertas pendientes');

    this.estado = EstadoOferta.ACEPTADA;
  }

  rechazar(): void {
    if (this.estado !== EstadoOferta.PENDIENTE)
      throw new Error('Solo se pueden rechazar ofertas pendientes');

    this.estado = EstadoOferta.RECHAZADA;
  }
}

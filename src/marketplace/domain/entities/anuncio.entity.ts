import { v4 as uuid } from 'uuid';
import { Precio } from '../value-objects/precio.vo';
import { Ubicacion } from '../value-objects/ubicacion.vo';
import { Categoria, EstadoAnuncio } from '../value-objects/enums';
import { Oferta } from './oferta.entity';

export class Anuncio {
  public readonly anuncioId: string;
  private _ofertas: Oferta[] = [];

  constructor(
    public readonly vendedorId: string,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly precio: Precio,
    public readonly categoria: Categoria,
    public readonly ubicacion: Ubicacion,
    public estado: EstadoAnuncio = EstadoAnuncio.ACTIVO,
    public readonly fechaCreacion: Date = new Date(),
    public fechaActualizacion: Date = new Date(),
    anuncioId?: string,
  ) {
    this.anuncioId = anuncioId || uuid();
    this.validarTitulo();
    this.validarDescripcion();
  }

  get ofertas(): readonly Oferta[] {
    return [...this._ofertas];
  }

  agregarOferta(oferta: Oferta): void {
    if (this.estado !== EstadoAnuncio.ACTIVO) {
      throw new Error('No se pueden agregar ofertas a un anuncio inactivo');
    }
    this._ofertas.push(oferta);
  }

  marcarComoVendido(): void {
    this.estado = EstadoAnuncio.VENDIDO;
    this.fechaActualizacion = new Date();
  }

  private validarTitulo(): void {
    if (!this.titulo || this.titulo.trim().length < 5) {
      throw new Error('El título debe tener al menos 5 caracteres');
    }
  }

  private validarDescripcion(): void {
    if (!this.descripcion || this.descripcion.trim().length < 10) {
      throw new Error('La descripción debe tener al menos 10 caracteres');
    }
  }
}

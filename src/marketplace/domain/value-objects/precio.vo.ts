export class Precio {
  constructor(
    public readonly cantidad: number,
    public readonly moneda: string = 'USD',
  ) {
    if (cantidad < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    if (!moneda || moneda.length !== 3) {
      throw new Error('La moneda debe tener 3 caracteres');
    }
  }

  toString(): string {
    return `${this.cantidad} ${this.moneda}`;
  }
}

export class Ubicacion {
  constructor(
    public readonly latitud: number,
    public readonly longitud: number,
    public readonly direccion: string,
  ) {
    if (latitud < -90 || latitud > 90) {
      throw new Error('Latitud debe estar entre -90 y 90');
    }
    if (longitud < -180 || longitud > 180) {
      throw new Error('Longitud debe estar entre -180 y 180');
    }
  }
}

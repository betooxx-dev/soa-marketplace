import { v4 as uuid } from 'uuid';

export class Usuario {
  public readonly usuarioId: string;

  constructor(
    public readonly nombre: string,
    public readonly email: string,
    public readonly telefono?: string,
    public readonly fechaRegistro: Date = new Date(),
    usuarioId?: string,
  ) {
    this.usuarioId = usuarioId || uuid();
    this.validarNombre();
    this.validarEmail();
  }

  private validarNombre(): void {
    if (!this.nombre || this.nombre.trim().length < 2)
      throw new Error('El nombre debe tener al menos 2 caracteres');
  }

  private validarEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) throw new Error('Email inválido');
  }
}

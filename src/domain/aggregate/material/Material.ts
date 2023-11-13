export class Material {
  constructor(public readonly id: string, public readonly name: string) {}

  public get json() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export class Material {
  public id;
  public name;
  public priceInfo;

  constructor(params: {
    id: string;
    name: string;
    priceInfo?: { price: number; amount: number };
  }) {
    this.id = params.id;
    this.name = params.name;
    this.priceInfo = params.priceInfo;
  }

  public get json() {
    return {
      id: this.id,
      name: this.name,
      priceInfo: this.priceInfo,
    };
  }
}

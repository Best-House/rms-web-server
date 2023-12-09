export class Material {
  constructor(
    public readonly id: MaterialScheme["id"],
    public readonly name: MaterialScheme["name"],
    public readonly defaultUnitPrice?: MaterialScheme["defaultUnitPrice"],
  ) {}

  public get json() {
    return {
      id: this.id,
      name: this.name,
      defaultUnitPrice: this.defaultUnitPrice,
    };
  }

  public static from({ id, name, defaultUnitPrice }: MaterialScheme) {
    return new Material(id, name, defaultUnitPrice);
  }
}

export type IdentifyMaterial = {
  id: Material["id"];
};

export type DraftMaterial = {
  name: Material["name"];
  defaultUnitPrice: Material["defaultUnitPrice"];
};

/** 원자재 */
export class MaterialScheme {
  /** 원자재 식별자 */
  id: string;
  /** 원자재 이름 */
  name: string;
  /** 단위당 가격 */
  defaultUnitPrice?: number;
}

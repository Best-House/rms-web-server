/** 원자재 */
export class Material {
  constructor(
    /** 원자재 식별자 */
    public readonly id: string,
    /** 원자재 이름 */
    public readonly name: string,
    /** 원자재 기본 단위당 가격 */
    public readonly defaultUnitPrice?: number,
  ) {}

  public get json() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

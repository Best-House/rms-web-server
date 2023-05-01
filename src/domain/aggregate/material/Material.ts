export class Material {
  id: MaterialType["id"];
  name: MaterialType["name"];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface MaterialType {
  id: string;
  name: string;
}

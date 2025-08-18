// src/models/Location.ts
export type ModelInit<T> = Partial<T>;

export class Location {
  readonly id: string;
  readonly name!: string;
  readonly description?: string;
  readonly latitude!: number;
  readonly longitude!: number;
  readonly owner?: string;

  constructor(init: ModelInit<Location>) {
    Object.assign(this, init);
    this.id = init.id ?? crypto.randomUUID();
  }
}

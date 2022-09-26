import { UserProps } from "./User"

export class Attributes<T> {

  constructor(private data: T) { }

  get(key: string): (string | number | boolean) {
    return this.data[key]
  }

  set(update: T): void {
    Object.assign(this.data, update)
  }
}

import { UserProps } from "./User"

export class Attributes<T extends object> {

  constructor(private data: T) { }

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set(update: T): void {
    Object.assign(this.data, update)
  }

  getAll(): T {
    return this.data
  }
}

// const attributes = new Attributes<UserProps>({ id: 5, name: 'person', age: 21 })

// const name = attributes.get('name')
// const age = attributes.get('age')
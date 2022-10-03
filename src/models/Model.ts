import { Axios, AxiosPromise, AxiosResponse } from "axios"
import { Attributes } from "./Attributes"

interface ModelAttributes<T> {
  set(value: T): void,
  get<K extends keyof T>(key: K): T[K],
  getAll(): T
}

interface Sync<T> {
  fetch(id: number): AxiosPromise,
  save(data: T): AxiosPromise
}

interface Events {
  //type alias can be imported or inline
  on(eventName: string, callback: () => void): void,
  trigger(eventName: string): void
}

export interface HasID {
  id?: number
}

export class Model<T extends HasID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }

  //condensed code
  // on = this.events.on;
  // trigger = this.events.trigger;
  // get = this.attributes.get;

  // eventing methods
  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }
  // attributes methods
  get get() {
    return this.attributes.get
  }

  set(update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }
  // sync methods
  fetch(): void {
    const id = this.get('id')
    if (typeof id !== 'number') {
      throw new Error('ID not found')
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data)
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save')
      })
      .catch((error: any) => {
        console.log('save error: ', error)
        this.trigger('error')
      })
  }


}
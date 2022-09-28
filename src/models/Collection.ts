import axios, { AxiosError, AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { User, UserProps } from "./User";

export class Collection<T, K> {
  models: T[] = [];
  events = new Eventing()

  constructor(public rootURL: string, public deserialize: (json: K) => T) { }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  fetchAll(): void {
    axios.get(this.rootURL)
      .then((response: AxiosResponse) => {
        response.data.forEach((item: K) => {
          this.models.push(this.deserialize(item));
        })
        this.trigger('change')
      })
      .catch((error: AxiosError) => {
        console.log('Axios error: ', error)
      })
  }
}

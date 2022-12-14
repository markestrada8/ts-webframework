import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number
}

export class APISync<T extends HasId> {

  constructor(public rootURL: string) { }

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`)
  }

  //MY CODE
  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.rootURL}/${id}`, data)
    } else {
      return axios.post(this.rootURL, data)
    }
  }
}
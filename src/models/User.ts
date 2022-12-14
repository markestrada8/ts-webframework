import { APISync } from "./APISync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";


export interface UserProps {
  id?: number;
  name?: string;
  age?: number
}

const rootURL = "http://localhost:3000/users"

export class User extends Model<UserProps> {

  static buildUser(attributes: UserProps): User {
    return new User(
      new Attributes<UserProps>(attributes),
      new Eventing(),
      new APISync<UserProps>(rootURL)
    )
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootURL, (json: UserProps) => User.buildUser(json))
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100)
    this.set({ age: age })
  }

  // SETUP CODE EXTRACED TO MODEL CLASS
  // public events: Eventing = new Eventing()
  // public sync: Sync<UserProps> = new Sync<UserProps>(rootURL)
  // public attributes: Attributes<UserProps>

  // constructor(data: UserProps) {
  //   this.attributes = new Attributes<UserProps>(data)
  // }

  //METHOD REFERENCE RAW
  // on(eventName: string, callback: Callback): void {
  //   this.events.on(eventName, callback)
  // }
  //METHOD REFERENCE REFACTOR (User methods return a
  // reference to external in 'compositional' class methods)

  //NOW IN MODEL

}


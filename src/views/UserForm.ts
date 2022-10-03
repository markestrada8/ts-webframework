import { View } from './View'
import { User, UserProps } from '../models/User'

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    //CHECK AGAINST NULL VALUE
    if (input) {
      const name = input.value
      this.model.set({ name: name })
    }
  }

  onSaveClick = (): void => {
    this.model.save()
  }


  template() {
    // THESE ELEMENTS NOW HANDLED BY USER EDIT
    // <h2>${this.model.get('name')}</h2>
    // <h2>${this.model.get('age')}</h2>
    return `
    <div>
      <input placeholder="${this.model.get('name')}"/>
      <button class="set-name">Change Name</button>
      <button class="set-age">Set Random Age</button>
      <button class="save-model">Save</button>
    </div>
    `
  }

}
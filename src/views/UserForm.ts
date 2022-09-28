import { User } from "../models/User"

export class UserForm {
  constructor(public parent: HTMLElement, public model: User) {
    this.bindModel()
  }

  bindModel() {
    this.model.on('change', () => {
      this.render()
    })
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
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

  template() {
    return `
    <div>
      <h1>User Form</h1>
      <h3>User Name: ${this.model.get('name')}</h3>
      <h3>User Age: ${this.model.get('age')}</h3>
      <input />
      <button class="set-name">Change Name</button>
      <button class="set-age">Set Random Age</button>
    </div>
    `
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':')

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }

  }

  render() {
    //EMPTY PARENT ELEMENT (INSANTIATED WITH 'ROOT' AS PARENT)
    this.parent.innerHTML = ''

    //CREATE ELEMENT / WRITE HTML TO ELEMENT
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    //BIND EVENT AND LISTENERS TO PARENT ELEMENT
    //CONTENT = REFERENCE TO HTML DOCUMENT FRAGMENT
    this.bindEvents(templateElement.content)

    //INSERT FRAGEMENT INTO DOM UNDER PARENT
    this.parent.append(templateElement.content)
  }
}
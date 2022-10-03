import { Model } from '../models/Model'
import { HasID } from '../models/Model'

export abstract class View<T extends Model<K>, K extends HasID> {

  regions: { [key: string]: Element } = {}

  constructor(public parent: Element, public model: T) {
    this.bindModel()
  }

  abstract template(): string

  regionsMap(): { [key: string]: string } {
    return {}
  }

  eventsMap(): { [key: string]: () => void } {
    return {}
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap()

    for (let key in regionsMap) {
      const selector = regionsMap[key]
      const element = fragment.querySelector(selector)
      if (element) {
        this.regions[key] = element
      }
    }
  }

  onRender(): void { }

  render() {
    //EMPTY PARENT ELEMENT (INSANTIATED WITH 'ROOT' AS PARENT)
    this.parent.innerHTML = ''

    //CREATE ELEMENT / WRITE HTML TO ELEMENT
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    //BIND EVENT AND LISTENERS TO PARENT ELEMENT
    //CONTENT = REFERENCE TO HTML DOCUMENT FRAGMENT
    this.bindEvents(templateElement.content)

    //CONNECT DATA MAPPER TO RENDER DISPLAY REGIONS?
    this.mapRegions(templateElement.content)

    //ESTABLISH DOUCMENT TREE
    this.onRender()

    //INSERT FRAGEMENT INTO DOM UNDER PARENT
    this.parent.append(templateElement.content)
  }
}
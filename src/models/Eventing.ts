export type Callback = () => void

export class Eventing {
  events: {
    [key: string]: Callback[]
  } = {}

  //EVENT SUBSCRIBER - ADD CALLBACKS TO ARRAY FOR EACH ACTION/EVENT
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  //INVOKE ALL CALLBACKS FOR EACH ACTION/EVENT
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName]
    if (!handlers || handlers.length === 0) {
      return
    }
    handlers.forEach(callBack => {
      callBack()
    })
  }
}
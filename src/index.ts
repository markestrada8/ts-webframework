import { User } from "./models/User";
import axios from 'axios'

const url = 'http://localhost:3000/users'

const user = new User({ name: 'Jon Snow', age: 23 })

user.events.on('click', () => { console.log('Thou clickest me') })
user.events.trigger('click')


// axios.post(url, {
//   name: 'userOne',
//   age: 21
// })

// const user = new User({ name: "my name", age: 20 })

// console.log(user.get('name'))
// console.log(user.get('age'))

// user.set({ age: 54 })

// console.log(user.get('name'))
// console.log(user.get('age'))

// user.on('change', () => {
//   console.log('change callback 1')
// })

// user.on('change', () => {
//   console.log('change callback 2')

// })
// user.on('save', () => {
//   console.log('save callback 112')

// })

// console.log(user)

// user.trigger('change')
// user.trigger('save')
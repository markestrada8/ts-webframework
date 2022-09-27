import { User, UserProps } from "./models/User";
import axios from 'axios'

const url = 'http://localhost:3000/users'

const user = User.buildUser({ id: 1, name: 'will it save', age: 23234 })

// console.log(user.get<'name'>('name'))

user.on('change', () => {
  console.log(user)
})

user.save()
user.fetch()


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
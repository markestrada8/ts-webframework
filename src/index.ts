import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ id: 5, name: 'Barry', age: 23 });

const root = document.getElementById("root")

if (root) {
  const userForm = new UserForm(
    root,
    user
  )
  userForm.render()
} else {
  throw new Error('Root element not defined')
}






// const url = 'http://localhost:3000/users'

// console.log(user.get<'name'>('name'))

// const collection = User.buildUserCollection()

// collection.on('change', () => {
//   console.log(collection)
// })

// collection.fetchAll()
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
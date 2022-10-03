// import { User } from "./models/User";
// import { UserEdit } from "./views/UserEdit";
// import { UserForm } from "./views/UserForm";
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";


// const user = User.buildUser({ name: 'Bozo', age: 23 });

// const root = document.getElementById("root")

// if (root) {
//   const userForm = new UserForm(
//     root,
//     user
//   )
//   userForm.render()
// } else {
//   throw new Error('Root element not defined')
// }

//EXPANDED USER FORM / DETAILS VIEW
// if (root) {
//   const userEdit = new UserEdit(root, user)

//   userEdit.render()

// console.log(userEdit)
// } else {
//   throw new Error('Root element not defined')
// }

//FURTHER EXPANDED USERLIST AND COLLECTION VIEW
const users = new Collection('http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json)
  }
)

const user = User.buildUser({})

users.on('change', () => {
  const root = document.getElementById('root')
  if (root) {
    new UserList(root, users).render()
    const userEdit = new UserEdit(root, user)

    userEdit.render()
  }
})

users.fetch()






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
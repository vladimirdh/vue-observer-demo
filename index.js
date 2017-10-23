const Watcher = require('./watch')
const Observer = require('./observer')

let person = {
    name: 'Mike',
    age: 20,
    hobbies: ['football'],
    married: false,
}



new Observer(person)

new Watcher(() => {
    return person.name
}, (newValue, oldValue) => {
    console.log(`person.name 从 ${oldValue} 更新为 ${newValue}`)
})

new Watcher(() => {
    return person.age
}, (newValue, oldValue) => {
    console.log(`person.age 从 ${oldValue} 更新为 ${newValue}`)
})

new Watcher(() => {
    return person.hobbies
}, (newValue, oldValue) => {
    console.log(`person.hobbies 从 ${oldValue} 更新为 ${newValue}`)
})

new Watcher(() => {
    return person.married
}, (newValue, oldValue) => {
    console.log(`person.married 从 ${oldValue} 更新为 ${newValue}`)
})


person.name = 'Jack'
person.age = 21
person.hobbies.push('basketball')
person.married = true
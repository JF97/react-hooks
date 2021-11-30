// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, initialValue = null) => {
  const [value, setValue] = React.useState(() => {
    const storedValue = window.localStorage?.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  React.useEffect(() => {
    window.localStorage?.setItem(key, JSON.stringify(value))
  }, [value, key])
  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  //const [name, setName] = React.useState(() => getStoredName() || initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  /*React.useEffect(() => {
    setStoredName(name)
  }, [name, setStoredName])*/

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="jonas" />
}

export default App

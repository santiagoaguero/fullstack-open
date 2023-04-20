import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleName = (evt) => {
    setNewName(evt.target.value);
  }

  const handleNumber = (evt) => {
    setNewNumber(evt.target.value);
  }

  const handleClick = (evt) => {
    evt.preventDefault()
    const person = persons.filter((a) =>
        a.name === newName
    )
    if (person.length !== 0) {
        alert(`${newName} is already added to phonebook`)
    } else {
        const personObject = {
            name: newName,
            id: persons.length + 1,
            number: newNumber
          }
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Content persons={persons} />

    </div>
  )
}

export default App

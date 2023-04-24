import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import axios from 'axios'
import servicePerson from "./services/persons"
import Form from './components/Form'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [allPersons, setAllPersons] = useState([])
  

  useEffect(() => {
    servicePerson
      .getAll()
      .then(initialPersons => {
      setAllPersons(initialPersons)
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
    const person = allPersons.filter((a) =>
        a.name === newName

    )
    const personObject = person[0]
    const updatedPerson = { ...personObject, number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        servicePerson
          .update(updatedPerson.id, updatedPerson).then(returnedPerson => {
            console.log(`${returnedPerson.name} successfully updated`)
            setAllPersons(allPersons.map(x => x.id !== personObject.id ? x : returnedPerson))
          })
          .catch(() => {
            alert(`${personObject.name} was already deleted from server` )
          })
      }
    } else {
        const personObject = {
            name: newName,
            number: newNumber
          }
          servicePerson
            .create(personObject)
            .then(returnedPerson => {
              setAllPersons(allPersons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
      })
  }
}
  


  return (
    <div>
      <h2>Phonebook</h2>
      <Form onSubmit={handleClick}
      newName={newName} handleName={handleName} 
      newNumber={newNumber} handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} setAllPersons={setAllPersons} />

    </div>
  )
}

export default App

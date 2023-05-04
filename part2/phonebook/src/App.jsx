import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from "./components/Filter"
import personService from "./services/persons"
import Notification from './components/Notification'
import "./index.css"

  const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(()=>{
      personService
        .getAll()
        .then(initialPersons=> {
          setPersons(initialPersons)
        })
    }, [])


    const addPerson = (event) => {
      event.preventDefault()

      const findPerson = persons.find(x => x.name === newName)

      if(findPerson){
        const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (updateNumber){
          const personObject = {...findPerson,
            number: newNumber
          }
          personService
          .update(findPerson.id, personObject)
          .then(numberChanged =>{
            setPersons(persons.map(x => x.id !== numberChanged.id ? x : numberChanged))
            setNewName('')
            setNewNumber('')

            setErrorMessage({
              notification: `Updated number for ${findPerson.name}`
            });
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage({
              error: `Information for ${findPerson.name} has already been removed from server`
            });
            setPersons(persons.filter(x => x.id !== numberChanged.id));
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        }
      
      } 
       else {
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
        .create(personObject)
        .then(newPerson =>{
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')

          setErrorMessage({ notification: `Added ${newPerson.name}` });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        } )
        .catch(error2 => {
          //console.log(error2.response.data)
          setErrorMessage({
            error: error2.response.data.error
          })
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }

  const handleName = evt => setNewName(evt.target.value)

  const handleNumber = evt => setNewNumber(evt.target.value)

  const handleFilter = (evt) => {
    setNewFilter(evt.target.value)
    const filtered = persons.filter(x =>
      x.name.toLowerCase().includes(evt.target.value.toLowerCase()))

      setFilteredPersons(filtered);
    };


    const handleRemove = (id) =>{
      const remove = persons.find(x => x.id === id)
      if(remove) {
        const confirmDelete = window.confirm(`Delete ${remove.name}?`)
          if(confirmDelete){
            personService
            .remove(remove.id)
            .then(() =>{
            const cleanPersons = persons.filter(x => x.id !== id);
            setPersons(cleanPersons) })
          }
      } 
    }
    
  
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification
        message={
          errorMessage?.notification || errorMessage?.error
        }
        className={errorMessage?.notification ? "notification" : "error"} />
        <Filter value={newFilter} onChange={handleFilter} />
        <h2>add a new</h2>
        <PersonForm onSubmit={addPerson} 
        newName={newName} handleName={handleName}
        newNumber={newNumber} handleNumber={handleNumber} />
        <h2>Numbers</h2>
        <Persons
        persons={persons} 
        filteredPersons={filteredPersons} 
        filter={newFilter} 
        remove={handleRemove}/>
      </div>
    )
}

export default App

import servicePerson from "../services/persons"
const Person = ({name, number, allPersons, setAllPersons}) => {
    const handleDeletePerson = () => {
      const filteredPerson = allPersons.filter(person => person.name === name)
      if (window.confirm(`Delete the ${name} ?`)) {
        servicePerson
          .remove(filteredPerson[0].id)
        console.log(`${filteredPerson[0].name} successfully deleted`)
      }
      setAllPersons(allPersons.filter(person => person.id !== filteredPerson[0].id))
    }
  
    return (
      <li>
        {name} {number} <button onClick={handleDeletePerson}>delete</button>
      </li>
    )
  }

export default Person
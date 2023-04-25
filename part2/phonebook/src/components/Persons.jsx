import Person from "./Person"; 
 const Persons = ({ filter, persons, filteredPersons, remove }) => {
    return(
        <>
          {filter === ""
            ? persons?.map(x => <Person key={x.name} person={x} remove={remove} />)
            : filteredPersons?.map(person => (
                <Person key={person.name} person={person} remove={remove}/>
              ))}
        </>
      )};
export default Persons;
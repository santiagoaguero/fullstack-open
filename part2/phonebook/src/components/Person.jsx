
const Person = ({ person, remove }) => (
  <ul>
    <li>{person.name} {person.number}<button onClick={()=>remove(person.id)}>Delete</button></li>
  </ul>
)

export default Person;
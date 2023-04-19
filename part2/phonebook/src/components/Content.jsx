import Person from "./Person"

const Content = ({persons}) => {
    return(
        <ul>
        {persons.map((x, i) =>
          <Person key={i} name={x.name} number={x.number}/>
        )}
      </ul>
    )
}

export default Content
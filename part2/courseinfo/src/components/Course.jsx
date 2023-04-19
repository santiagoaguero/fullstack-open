import Header from "./Header"
import Content from "./Content"
import Total from "./Total"


const Course = ({courses}) =>{
    return(
      <>
      {courses.map(x =>//por cada array se necesita una key para renderizar
        <div key={x.id}>
        <Header title={x.name} />
        <Content content={x.parts} />
        <Total total={x.parts} />
        </div> 
      )}
      </>
    )
     
    }
export default Course;
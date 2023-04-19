import Header from "./Header"
import Content from "./Content"


const Course = ({courses}) =>{
    return(
      <>
      <Header title={courses.name} />
      <Content content={courses.parts} />
      </>
    )
     
    }
export default Course;
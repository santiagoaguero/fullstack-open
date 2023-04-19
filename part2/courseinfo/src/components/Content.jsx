import Texto from "./Texto"

const Content = ({content})=>{

    return(
            content.map((x, i) => 
            <Texto key={i} text={x.name} exercises={x.exercises}/>//se necesita una key para renderiar, entonces se crea otro componente Texto para que lo tenga
)

   )

}

export default Content
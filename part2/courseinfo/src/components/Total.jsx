const Total = ({total}) => {
    //total.map(x => suma += x.exercises)
    const initialValue = 0;
    const suma = total.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue);
    return(
        <b>Total of {suma} excersices</b>
    )
}

export default Total;
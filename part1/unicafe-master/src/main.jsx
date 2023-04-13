import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';


const Header = (props) => {
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <td>{props.text}: {props.value}</td>
  )
}

const Statistics = (props) => {
  if (props.good === 0 & props.neutral === 0 & props.bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      {/* estilizar tabla html */}
      <tbody>
        <tr><Statistic text="good" value={props.good} /></tr>
        <tr><Statistic text="neutral" value={props.neutral} /></tr>
        <tr><Statistic text="bad" value={props.bad} /></tr>
        <tr><Statistic text="all" value={props.all} /></tr>
        <tr><Statistic text="average" value={props.average} /></tr>
        <tr><Statistic text="positive" value={props.positive + '%'} /></tr>
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = ((good - bad) / all) * 10 //improve
  const positive = (good / all) * 100

  return (
    <div>
      <Header name="Give Feedback"/>
      <Button text="good" handleClick={goodClick} />
      <Button text="neutral" handleClick={neutralClick} />
      <Button text="bad" handleClick={badClick} />
      <Header name="Stadistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
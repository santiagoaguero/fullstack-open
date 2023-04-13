import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'


const Button = (props) =>{
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => <h1>{props.text}</h1>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState([
    0,
    0,
    0,
    0,
    0,
    0
  ]
  //every number corresponds to the index of each anecdote
  )

  const voteClick = () => {
    const newAllVotes = [...allVotes]
    newAllVotes[selected] += 1
    setAllVotes(newAllVotes)
  }

  const anotherAnecdote = () =>{
     const num = Math.floor(Math.random() * anecdotes.length)
      setSelected(num)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdota text={props.anecdotes[selected]} />
      <Button text="vote" onClick={voteClick}/>
      <Button text="Select another anecdote" onClick={anotherAnecdote}/>
      <Header text="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} votes={allVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdota = (props) => {
  return(
    <div>
      {props.text}
    </div>
  )
}
const Winner = ({anecdotes, votes}) => {
  const highestVote = Math.max(...votes)
  const winnerIndex = votes.indexOf(highestVote)//search the winner index inside the array
  const winner = anecdotes[winnerIndex]
  if (highestVote === 0) {
    return (
      <p>No votes yet</p>
    )
  }
  return (
    <div>
      <p>{winner}</p>
      <p>has {highestVote} votes</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
)

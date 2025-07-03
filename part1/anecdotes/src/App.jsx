import { useState } from 'react'

const Rank = ({anecdote,votes}) => {
  if (votes > 0){
    return(
      <>
      <h2>anecdote with most votes</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
      </>
    )
  }
  else{
    return(
      <p>Please vote</p>      
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const arrLen = anecdotes.length
  
  const [ votes, setVotes ] = useState(
    Array(arrLen).fill(0)
  )

  const maxValue = Math.max(...votes)
  const maxIndex = votes.indexOf(maxValue)

  const pickRandom = () => {
    const random = Math.round((Math.random() * (arrLen-1)))
    setSelected(random)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  
  return (
    <div>
      <h2>anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      <button onClick={() => vote()}>vote</button>
      <button onClick={() => pickRandom()}>next anecdote</button>
      <p>anecdote has {votes[selected]} votes</p>

      <Rank votes={votes[maxIndex]} anecdote={anecdotes[maxIndex]} />
    </div>
  )
}

export default App
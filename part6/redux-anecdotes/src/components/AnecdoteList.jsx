import { useDispatch, useSelector } from "react-redux"
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification, clear } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const notificationForSeconds = ( msg, seconds ) => {
      dispatch(setNotification(msg))

      setTimeout( () => {
        dispatch(clear())
      }, seconds*1000)

    }

    const vote = (anecdote) => {
        console.log(anecdote)
        dispatch(incrementVote(anecdote.id))
        notificationForSeconds( `You voted for ${anecdote.content}`, 5)
    }

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)

    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)


    return(
      <>
      <h2>Anecdotes</h2>
      { sortedAnecdotes.map(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) ?
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      : null ) 
      }
      </>
    )
  }

  export default AnecdoteList
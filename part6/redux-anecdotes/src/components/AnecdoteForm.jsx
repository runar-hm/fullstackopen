
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submitAnecdote = ( event ) => {
    event.preventDefault()
    
    anecdoteService.create(event.target.anecdote.value)
    .then(newAnec => dispatch(createAnecdote(newAnec)))
  } 

  return(
    <>
    <h2>create new</h2>
    <form onSubmit={submitAnecdote}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm
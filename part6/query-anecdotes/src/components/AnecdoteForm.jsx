import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const newAnecMutation = useMutation({    
    mutationFn: create,
    onSuccess: ( newAnecdote ) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({type:'SETMSG', payload:`Created new anecdote: ${newAnecdote.content}`})
      setTimeout(() => {
        dispatch({type:'CLEAR'})
      }, 5000)
    },
    onError: ( error ) => {

      dispatch({type:'SETMSG', payload:error.response.data.error})
      setTimeout(() => {
        dispatch({type:'CLEAR'})
      }, 5000)
    }
  })
 
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({content})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={ onCreate }>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

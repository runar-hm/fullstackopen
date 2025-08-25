import { useContext } from 'react'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: ( vA ) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecs.map(a => a.id === vA.id ? vA : a))
      dispatch({type:'SETMSG', payload:`You voted for ${vA.content}`})
      setTimeout(() => {
        dispatch({type:'CLEAR'})
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {
    const anecVoted = {...anecdote, votes:anecdote.votes+1} 
    voteMutation.mutate(anecVoted)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry:2
  })

  console.log(result)

  if (result.isLoading){
    return <div>loading anecdotes..</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to server problems</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm queryClient={queryClient}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

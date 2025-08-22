import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// before server
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
// const initialState = anecdotesAtStart.map(asObject)
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Old way
// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   const payload = action.payload

//   switch (action.type) {
//     case 'VOTE': {
//       return state.map(n => n.id === payload.id ? {...n, votes:n.votes+1} : n)
//     }
//     case 'CREATE_ANECDOTE': {
//       return state.concat(payload)
//     }
//   }
//   return state
// }

// export const incrementVote = (id) => {
//   return {
//     type:'VOTE',
//     payload: {id}
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type:'CREATE_ANECDOTE',
//     payload: {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote( state, action ) {
      state.push(action.payload)
    },
    incrementVote( state, action ) {
      return state.map(a => action.payload === a.id ? {...a, votes:a.votes+1} : a)
    },
    setAnecdotes( state, action ){
      return action.payload
    },
  }
})


export const { createAnecdote, incrementVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
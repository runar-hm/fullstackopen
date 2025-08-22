import { setFilter } from '../reducers/anecdoteFilterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {

    const style = {
        marginBottom: 10
    }

    const dispatch = useDispatch()

    const handleInput = ( event ) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div style={style}>
         filter <input placeholder='filter' name='filter' onChange={handleInput}></input>
        </div>
    )
}

export default AnecdoteFilter
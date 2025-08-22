import { createSlice } from '@reduxjs/toolkit'

// Old way
// const filterReducer = ( state = '', action ) => {
//     console.log('State: ',state)
//     switch(action.type) {
//         case 'UPDATE': return action.payload
//     }

//     return state
// }

// export const setFilter = (content) => {
//     return(
//         {
//             type: 'UPDATE',
//             payload: content
//         }
//     )
// } 

const filterSlice = createSlice({
    name: 'filter',
    initialState:'',
    reducers:{
        setFilter(state, action) {
            return action.payload
        }

    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    
    name:"user",
    initialState : null,
    reducers:{
        addUser:(state,action) =>{
            //persist to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload
        },
        removeUser:(state,action)=>{
            //clear from localStorage
            localStorage.removeItem('user')
            return null
        }
    }
})

export const { addUser , removeUser} = userSlice.actions

export default userSlice.reducer
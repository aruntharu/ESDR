import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    width: 30,
    height: 40,
    backgroundColor: 'red'
 }

const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    
    increaseWidth(state) {
      state.width = state.width + 1    },
    
  },
})

export const { increment, decrement, incrementByAmount } = boxSlice.actions
export default boxSlice.reducer
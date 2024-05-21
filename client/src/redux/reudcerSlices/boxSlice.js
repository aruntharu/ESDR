import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  backgroundColor : 'red',
  width: 50,
  height: 50
 }

const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    changeHeight(state) {
      state.value=state.value+1
    },
  },
})

export const { changeHeight } = boxSlice.actions
export default boxSlice.reducer
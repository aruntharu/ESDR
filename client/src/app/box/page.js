'use client'
import { changeBackgroundColor, changeHeight, changeShape, changeWidth } from '@/redux/reducerSlices/boxSlice'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Box = () => {
    const {height, width, backgroundColor, borderRadius} = useSelector(state=>state.box)
    const dispatch = useDispatch()

  return (
    <div>
      <div style={{backgroundColor: backgroundColor, height: height, width:width, borderRadius:borderRadius }}>
        
      </div>

      <Button onClick={()=>dispatch(changeWidth())}>+Width</Button>
      <Button onClick={()=>dispatch(changeHeight())}>+Height</Button>
      <Button onClick={()=>dispatch(changeShape())}>Change to Click</Button>
      <Input onChange={(e)=>dispatch(changeBackgroundColor(e.target.value))} placeholder='Entercolor'/>

    </div>
  )
}

export default Box
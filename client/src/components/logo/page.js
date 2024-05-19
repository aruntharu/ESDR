import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Image src={require('../Images/logo.png')} width={70} height={80}/>
    </div>
  )
}

export default Logo
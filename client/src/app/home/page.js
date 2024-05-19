'use client'
import Videos from '@/components/Videos/page'
import Footer from '@/components/footer/page'
import Heroimage from '@/components/heroimage/page'
import NavBar from '@/components/navbar/page'
import News from '@/components/news&events/page'

import React from 'react'

const home = () => {
  return (
    <div>
        <NavBar/>
        <Heroimage/>
        <News/>
        <Videos/>
        <Footer/>
    </div>
  )
}

export default home
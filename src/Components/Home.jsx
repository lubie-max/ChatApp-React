import React from 'react'
import MainGrid from './MainGrid'
import SideBar from './SideBar'

const Home = () => {
  return (
    <div className='flex md:flex-row flex-shrink-0 '>
<SideBar/>
<MainGrid/>
    </div>
  )
}

export default Home
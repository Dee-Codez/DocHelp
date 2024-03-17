import React from 'react'
import NavBar from './containers/NavBar'
import Chat from './containers/Chat'

const App = () => {
  return (
    <div className=''>
      <div>
        <div className='relative flex'>
          <div className='absolute top-0'>
            <NavBar file={"file"} />
          </div>
          <div className='absolute left-1/2 top-[30vh] transfrom -translate-x-1/2'>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

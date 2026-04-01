import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewEarrings from './pages/ViewEarrings'
import EditEarring from './pages/EditEarring'
import CreateEarring from './pages/CreateEarring'
import EarringDetails from './pages/EarringDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateEarring title='DIY EARRINGS | Customize' />
    },
    {
      path:'/customearrings',
      element: <ViewEarrings title='DIY EARRINGS | Custom Earrings' />
    },
    {
      path: '/customearrings/:id',
      element: <EarringDetails title='DIY EARRINGS | View' />
    },
    {
      path: '/edit/:id',
      element: <EditEarring title='DIY EARRINGS | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
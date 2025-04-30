
import './App.css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import AddTodoForm from './components/AddTodoForm'

import Achievements from './components/Achivements'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<AddTodoForm/>} />
        <Route path='/achivements' element={<Achievements/>} />
        
      </Routes>
    </BrowserRouter>
        
    </>
  )
}

export default App

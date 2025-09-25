import Signup from './Signup/Signup'
import Login from './Login/Login'
import Welcome from './Welcome/Welcome'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'


function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CandidateHome from './Pages/CandidateHome'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/candidate/home" element={<CandidateHome/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

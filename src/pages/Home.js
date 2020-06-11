import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <h1 style={{ color: 'white' }}>First Page</h1>
      <Link to="/CupGenerator">Cup Creator</Link>|
    </div>

  )
}

export default Home

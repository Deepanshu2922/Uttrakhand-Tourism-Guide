import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import ComponentsDemo from './pages/ComponentsDemo.jsx'
import Destinations from './pages/Destinations.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/components" element={<ComponentsDemo />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App

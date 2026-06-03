import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Thanks from './pages/Thanks'
import MusicToggle from './components/MusicToggle'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
      <MusicToggle />
    </>
  )
}

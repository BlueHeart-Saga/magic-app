import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GuessMyNumber from './pages/GuessMyNumber'
import GuessMyBirthday from './pages/GuessMyBirthday'
import CardTrick from './pages/CardTrick'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game/guess-my-number" element={<GuessMyNumber />} />
          <Route path="game/guess-my-birthday" element={<GuessMyBirthday />} />
          <Route path="game/card-trick" element={<CardTrick />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

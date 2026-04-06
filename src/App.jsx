import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GuessMyNumber from './pages/GuessMyNumber'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game/guess-my-number" element={<GuessMyNumber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

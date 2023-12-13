import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Header from './pages/header';
import Home from './pages/home';
import Ingame from './pages/ingame'
import Ranking from './pages/ranking'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/ingame' element={<Ingame />} />
        <Route path='/ranking' element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

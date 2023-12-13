import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Header from './pages/header';
import Home from './pages/home';
import Ingame from './pages/ingame'
import Ranking from './pages/ranking'

const root_path = "this-is-blog/react-tetris/tetris";
const ingame_path = `${root_path}/ingame`;
const ranking_path = `${root_path}/ranking`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes basename={root_path}>
        <Route path={root_path} element={<Home />}  />
        <Route path={ingame_path} element={<Ingame />} />
        <Route path={ranking_path} element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

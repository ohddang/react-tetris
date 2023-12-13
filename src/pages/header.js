import React from 'react';
import {Link} from 'react-router-dom';

const root_path = "this-is-blog/react-tetris/tetris";
const ingame_path = `${root_path}/ingame`;
const ranking_path = `${root_path}/ranking`;

function Header() {
  return (
    <>
      <ul>
        <li><Link to={root_path}>홈</Link></li>
        <li><Link to={ingame_path}>인게임</Link></li>
        <li><Link to={ranking_path}>랭킹</Link></li>
      </ul>
    </>
  );
}

export default Header;
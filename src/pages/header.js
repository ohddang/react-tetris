import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <>
      <ul>
        <li><Link to='/'>홈</Link></li>
        <li><Link to='/ingame'>인게임</Link></li>
        <li><Link to='/ranking'>랭킹</Link></li>
      </ul>
    </>
  );
}

export default Header;
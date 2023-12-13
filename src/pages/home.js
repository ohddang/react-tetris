import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <>
      <h3>Home</h3>
      <ul>
        <li><Link to='/ingame'>인게임</Link></li>
        <li><Link to='/ranking'>랭킹</Link></li>
      </ul>
    </>
  );
}

export default Home;
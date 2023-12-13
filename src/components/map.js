import React, { useState } from "react";
import { UseMapInfo } from './mapInfo.js';

import "../CSS/ingame.css"


function Cell({ type }) {
  let cell = [];

  if (type === 1)
    cell.push(<div className='block'></div>);
  if (type === 0)
    cell.push(<div className='none'></div>);
  if (type === 2)
    cell.push(<div className='my'></div>);

  return cell;
}

function Map() {
  const [mapInfo, setMapInfo] = UseMapInfo();
  
  function makeGrid() {
    let grid = [];
    for (let y = 19; y >= 0; --y) {
      for (let x = 9; x >= 0; --x) {
          grid.push(<Cell type={mapInfo[x][y]}/>);
      }
    }
    return grid;
  }

  return (
    <div className='grid'>
      {makeGrid()}
    </div>
  );
};

export default Map;
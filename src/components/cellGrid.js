import "../CSS/ingame.css"

import { useSelector } from 'react-redux';
import Cell from './Cell.js'
import UsePlayer from '../hooks/player.js'

export function CellGrid() {
  const [site, setState] = UsePlayer();
  const grid = useSelector((state) => state.grid.value);

  function makeGrid() {
    let items = [];
    for (let y = 19; y >= 0; --y) {
      for (let x = 9; x >= 0; --x) {
        items.push(<Cell type={grid[x][y]} id={x + y*20} />);
      }
    }
    return items;
  }

  return (
    <>
      <div class="cellGrid">
        {makeGrid()}
      </div>
    </>
  );
}

export default CellGrid;

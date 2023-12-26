import "../CSS/ingame.css";

import { useSelector } from "react-redux";
import Cell from "./Cell.js";
import UsePlayer from "../hooks/player.js";
import GLOBAL from "../const.js";

export function CellGrid() {
  const [position, setPosition] = UsePlayer();
  const grid = useSelector((state) => state.grid.value);

  function makeGrid() {
    let items = [];
    for (let y = GLOBAL.MAP_HEIGHT - 1; y >= 0; --y) {
      for (let x = 0; x < GLOBAL.MAP_WIDTH; ++x) {
        items.push(<Cell type={grid[x][y]} id={x + y * 20} />);
      }
    }
    return items;
  }

  return (
    <>
      <div class="cellGrid">{makeGrid()}</div>
    </>
  );
}

export default CellGrid;

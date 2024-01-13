import "../CSS/ingame.css";

import { useSelector } from "react-redux";
import Cell from "./cell.js";
import COMMON from "../const.js";

export function CellGrid() {
  const grid = useSelector((state) => state.grid.value);

  function makeGrid() {
    let items = [];
    for (let y = COMMON.MAP_HEIGHT - 1; y >= 0; --y) {
      for (let x = 0; x < COMMON.MAP_WIDTH; ++x) {
        items.push(<Cell type={grid[x][y]} />);
      }
    }
    return items;
  }

  return (
    <>
      <ul className="cellGrid">{makeGrid()}</ul>
    </>
  );
}

export default CellGrid;

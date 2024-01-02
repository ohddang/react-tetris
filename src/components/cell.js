import COMMON from "../const.js";

//
// TODO : type -> enum, const or context
//
function Cell({ type }) {
  let cell = {};

  if (type === COMMON.GRID_NONE) cell = <li className="none"></li>;
  if (type === COMMON.GRID_BLOCK) cell = <li className="block"></li>;
  if (type === COMMON.GRID_PLAYER) cell = <li className="my"></li>;

  return cell;
}

export default Cell;

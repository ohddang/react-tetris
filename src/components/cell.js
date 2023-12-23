
import GLOBAL from '../const.js'

//
// TODO : type -> enum, const or context
//
function Cell({ type, id }) {
  let cell = [];

  if (type === GLOBAL.GRID_NONE)
    cell.push(<div class='none' key={id}></div>);
  if (type === GLOBAL.GRID_BLOCK)
    cell.push(<div class='block' key={id}></div>);
  if (type === GLOBAL.GRID_PLAYER)
    cell.push(<div class='my' key={id}></div>);

  return cell;
}

export default Cell;
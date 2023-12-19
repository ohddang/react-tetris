//
// TODO : type -> enum, const or context
//
function Cell({ type, id }) {
  let cell = [];

  if (type === 1)
    cell.push(<div className='block' key={id}></div>);
  if (type === 0)
    cell.push(<div className='none' key={id}></div>);
  if (type === 2)
    cell.push(<div className='my' key={id}></div>);

  return cell;
}

export default Cell;
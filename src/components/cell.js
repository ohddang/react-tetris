import COMMON from "../const.js";

import { useMemo } from "react";

const Cell = ({ type }) => {
  return useMemo(() => {
    let cell = {};

    if (type === COMMON.GRID_NONE) cell = <li className="none"></li>;
    if (type === COMMON.GRID_BLOCK) cell = <li className="block"></li>;
    if (type === COMMON.GRID_PLAYER) cell = <li className="my"></li>;

    return cell;
  }, [type]);
};

export default Cell;

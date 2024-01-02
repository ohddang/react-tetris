import React from "react";
import Board from "./components/board";
import { useTimer } from "./hooks/timer";

function Ingame() {
  const time = useTimer(); // TODO : 타이머 어떤 컴포넌트에서 사용해야할까..

  return <Board />;
}

export default Ingame;

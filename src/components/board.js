import "../CSS/ingame.css";

import CellGrid from "./cellGrid.js";

function Board() {
  return (
    <div className="board">
      <div className="game_board">
        <div className="game_screen">
          <CellGrid />
          <div className="game_info">
            <p>★다음블록★</p>
            <p>스테이지Lv</p>
            <p>경과시간</p>
            <p>Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;

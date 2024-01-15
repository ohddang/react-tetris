import "../CSS/ingame.css";

import usePlayer from "../hooks/player.js";
import { useTimer } from "../hooks/timer.js";

import CellGrid from "./cellGrid.js";
import NextBlock from "./gameInfo/NextBlock.js";
import COMMON from "../const.js";
import Point from "./gameInfo/Point.js";
import GameTime from "./gameInfo/GameTime.js";
import Level from "./gameInfo/Level.js";
import Background from "./Background.js";

// game data component : max, score, nextblock, lv
const Board = () => {
  const { nextArea, playerState } = usePlayer();
  const time = useTimer();

  return (
    <div className="board">
      <Background />
      <div className="game_board">
        <div className="game_screen">
          <CellGrid />
          <div className="game_info">
            <section>
              <article>Max</article>
              <Point isMax={true} />
            </section>
            <section>
              <article>Score</article>
              <Point isMax={false} />
            </section>
            <section>
              <NextBlock area={nextArea} />
            </section>
            <section>
              <article>Level</article>
              <Level />
            </section>
            <section>
              <article>Time</article>
              <GameTime />
            </section>
          </div>
          {COMMON.PLAYER_DIE === playerState && (
            <div className="game_msg">
              <p>Game Over</p>
              <p>Press Enter to Restart</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;

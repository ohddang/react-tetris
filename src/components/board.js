import "../CSS/ingame.css";

import usePlayer from "../hooks/player.js";
import { useTimer } from "../hooks/timer.js";

import CellGrid from "./cellGrid.js";
import NextBlock from "./gameInfo/NextBlock.js";
import COMMON from "../const.js";

// game data component : max, score, nextblock, lv
const Board = () => {
  const { nextArea, playerState } = usePlayer();
  const time = useTimer();

  return (
    <div className="board">
      <div className="game_board">
        {COMMON.PLAYER_DIE === playerState && (
          <div className="game_msg">Game Over</div>
        )}
        <div className="game_screen">
          <CellGrid />
          <div className="game_info">
            <section>
              <article>Max</article>
              <div className="number_group">
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </section>
            <section>
              <article>Score</article>
              <div className="number_group">
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </section>
            <section>
              <NextBlock area={nextArea} />
            </section>
            <section>
              <article>Level</article>
              <div className="number_group">
                <div />
                <div />
                <div />
              </div>
            </section>
            <section>
              <article>Time</article>
              <div className="number_group">
                <div />
                <div />
                <div />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

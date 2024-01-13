import { useMemo } from "react";
import "../CSS/ingame.css";
import usePlayer from "../hooks/player.js";
import { useTimer } from "../hooks/timer.js";

import CellGrid from "./cellGrid.js";

// game data component : max, score, nextblock, lv
const Board = () => {
  const [nextArea, setPosition] = usePlayer();
  const time = useTimer();

  // console.log(nextArea);

  return useMemo(() => {
    return (
      <div className="board">
        <div className="game_board">
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
                <article>Next</article>
                <div className="next_block_container">
                  <div className="next_block">
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                    <div className="none" />
                  </div>
                </div>
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
  }, [time]);
};

export default Board;

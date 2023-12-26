import { useState, useEffect, useContext, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateGrid } from "../redux-toolkit/slice";
import GLOBAL, { PLAYER_ARRIVED } from "../const.js";
import { cloneDeep } from "lodash";

// 3x3 블럭 모양 랜덤 생성 최대 5개의 셀로 구성 중심점 기준으로 genblock 구현
// 90도 돌때마다 규칙이 있음 규칙에 따라서 정하고
// 상대위치로 {x,y}을 데이터로 하는 배열데이터 구성 / 도형데이터
// 타이머는 하나의 훅으로 구현해서 이곳저곳에서 사용? 아니면 어떻게 쓸지 생각해보기
// myBlock 객체는 중심점 좌표 있어야할듯 초기값으로 중심점좌표 주고 도형데이터(상대좌표) 적용하여 에서 처리

function UsePlayer() {
  const time = useSelector((state) => state.time.value);
  const grid = useSelector((state) => state.grid.value);
  const dispatch = useDispatch();

  const [position, setPosition] = useState({
    x: GLOBAL.START_X,
    y: GLOBAL.START_Y,
  });
  const [playerState, setPlayerState] = useState(GLOBAL.PLAYER_MOVE);

  function isPossibleMove(input_x, input_y) {
    const prevPosition = { ...position };
    const new_x = prevPosition.x + input_x;
    const new_y = prevPosition.y + input_y;

    if (GLOBAL.PLAYER_CREATE == playerState) {
      setPlayerState(GLOBAL.PLAYER_MOVE);
      setPosition({ x: GLOBAL.START_X, y: GLOBAL.START_Y });

      let newGrid = cloneDeep(grid);
      newGrid[GLOBAL.START_X][GLOBAL.START_Y] = GLOBAL.GRID_PLAYER;
      dispatch(updateGrid(newGrid));
    } else if (GLOBAL.PLAYER_ARRIVED === playerState) {
      setPlayerState(GLOBAL.PLAYER_CREATE);

      let newGrid = cloneDeep(grid);
      newGrid[prevPosition.x][prevPosition.y] = GLOBAL.GRID_NONE;
      newGrid[new_x][new_y] = GLOBAL.GRID_BLOCK;
      dispatch(updateGrid(newGrid));
    } else if (GLOBAL.PLAYER_MOVE === playerState) {
      if (
        input_x !== 0 &&
        (new_x < 0 ||
          new_x > GLOBAL.MAP_WIDTH - 1 ||
          GLOBAL.GRID_BLOCK == grid[new_x][new_y])
      )
        return false;
      if (
        // TODO : game over 처리
        input_y !== 0 &&
        (new_y < 0 || GLOBAL.GRID_BLOCK == grid[new_x][new_y])
      ) {
        setPlayerState(GLOBAL.PLAYER_ARRIVED);
        return false;
      }
      setPosition({ x: new_x, y: new_y });

      let newGrid = cloneDeep(grid);
      newGrid[prevPosition.x][prevPosition.y] = GLOBAL.GRID_NONE;
      newGrid[new_x][new_y] = GLOBAL.GRID_PLAYER;
      dispatch(updateGrid(newGrid));
    }
  }

  // 12.27
  // 상위 함수에 Position State
  //
  const onkeydown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        isPossibleMove(-1, 0);
        break;
      case "ArrowRight":
        isPossibleMove(1, 0);
        break;
      case "ArrowUp":
        break;
      case "ArrowDown":
        isPossibleMove(0, -1);
        break;
    }
  };

  useEffect(() => {
    if (playerState === GLOBAL.PLAYER_MOVE) {
      isPossibleMove(0, -1);
    } else {
      isPossibleMove(0, 0);
    }
  }, [time, playerState]);

  useEffect(() => {
    window.addEventListener("keydown", onkeydown);

    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [position]);

  return [position, setPosition];
}

export default UsePlayer;

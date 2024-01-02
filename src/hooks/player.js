import { useState, useEffect, useContext, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateGrid, updateGridFromPlayer } from "../redux-toolkit/slice";
import COMMON, { PLAYER_ARRIVED } from "../const.js";
import { cloneDeep, result } from "lodash"; // web browser 함수로 수정 뭐였지..

// 3x3 블럭 모양 랜덤 생성 최대 5개의 셀로 구성 중심점 기준으로 genblock 구현
// 90도 돌때마다 규칙이 있음 규칙에 따라서 정하고
// 상대위치로 {x,y}을 데이터로 하는 배열데이터 구성 / 도형데이터
// 타이머는 하나의 훅으로 구현해서 이곳저곳에서 사용? 아니면 어떻게 쓸지 생각해보기
// myBlock 객체는 중심점 좌표 있어야할듯 초기값으로 중심점좌표 주고 도형데이터(상대좌표) 적용하여 에서 처리

function usePlayer() {
  const time = useSelector((state) => state.time.value);
  const grid = useSelector((state) => state.grid.value);
  const dispatch = useDispatch();

  const [position, setPosition] = useState({
    x: COMMON.START_X,
    y: COMMON.START_Y,
  });
  const [playerState, setPlayerState] = useState(COMMON.PLAYER_MOVE);
  const [area, setArea] = useState([
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ]); // [{x,y},{x,y},{x,y}

  const playerInfo = {
    position: { ...position },
    area: { ...area },
    playerState: playerState,
  };

  function calculatePlayerArea(input_x, input_y) {
    const prevPosition = { ...position };
    const new_x = prevPosition.x + input_x;
    const new_y = prevPosition.y + input_y;

    if (input_x !== 0) {
      for (const site of [{ x: 0, y: 0 }, ...area]) {
        const calc_x = site.x + new_x;
        const calc_y = site.y + new_y;

        if (
          calc_x < 0 ||
          calc_x > COMMON.MAP_WIDTH - 1 ||
          COMMON.GRID_BLOCK === grid[calc_x][calc_y]
        )
          return { result_x: prevPosition.x, result_y: prevPosition.y };
      }
      return { result_x: new_x, result_y: new_y };
    } else if (input_y !== 0) {
      for (const site of [{ x: 0, y: 0 }, ...area]) {
        const calc_x = site.x + new_x;
        const calc_y = site.y + new_y;

        if (calc_y > COMMON.MAP_HEIGHT - 1)
          return { result_x: new_x, result_y: new_y };

        if (calc_y < 0 || COMMON.GRID_BLOCK === grid[calc_x][calc_y])
          return { result_x: prevPosition.x, result_y: prevPosition.y };
      }

      return { result_x: new_x, result_y: new_y };
    }

    return { result_x: prevPosition.x, result_y: prevPosition.y };
  }

  function isPossibleMove(input_x, input_y) {
    playerInfo.position = position;
    playerInfo.area = area;
    playerInfo.playerState = playerState;

    if (COMMON.PLAYER_CREATE == playerState) {
      setPlayerState(COMMON.PLAYER_MOVE);

      dispatch(updateGridFromPlayer(playerInfo));
    } else if (COMMON.PLAYER_ARRIVED === playerState) {
      setPlayerState(COMMON.PLAYER_CREATE);
      setPosition({ x: COMMON.START_X, y: COMMON.START_Y });

      dispatch(updateGridFromPlayer(playerInfo));
    } else if (COMMON.PLAYER_WAIT_EFFECT === playerState) {
      /* block disappear fx */
    } else if (COMMON.PLAYER_MOVE === playerState) {
      const { result_x, result_y } = calculatePlayerArea(input_x, input_y);
      if (input_y !== 0 && position.y === result_y) {
        setPlayerState(COMMON.PLAYER_ARRIVED);
      }
      playerInfo.position = { x: result_x, y: result_y };
      setPosition({ x: result_x, y: result_y });

      dispatch(updateGridFromPlayer(playerInfo));
    }
  }

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
    if (playerState === COMMON.PLAYER_MOVE) {
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

export default usePlayer;

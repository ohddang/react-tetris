import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateGridFromPlayer } from "../redux-toolkit/slice";
import COMMON from "../const.js";

// myBlock 객체는 중심점 좌표 있어야할듯 초기값으로 중심점좌표 주고 도형데이터(상대좌표) 적용하여 에서 처리

const usePlayer = () => {
  const time = useSelector((state) => state.time.value);
  const grid = useSelector((state) => state.grid.value);
  const dispatch = useDispatch();

  const [position, setPosition] = useState({
    x: COMMON.START_X,
    y: COMMON.START_Y,
  });
  const [playerState, setPlayerState] = useState(COMMON.PLAYER_CREATE);
  const [area, setArea] = useState([]);
  const [nextArea, setNextArea] = useState([]);

  const [isRotate, setIsRotate] = useState(true);

  const playerInfo = {
    position: { ...position },
    area: { ...area },
    playerState: playerState,
  };

  const RELATIVE_POSITION = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
  ];

  const genBlock = () => {
    const block = [];
    const blockCount = 4;

    block.push({ x: 0, y: 0 });
    while (block.length < blockCount) {
      const x = Math.floor(Math.random() * 3) - 1;
      const y = Math.floor(Math.random() * 3) - 1;

      if (undefined != block.find((site) => site.x === x && site.y === y))
        continue;

      if (
        block.filter((site) => {
          return Math.abs(site.x - x) + Math.abs(site.y - y) === 1;
        }).length > 0
      )
        block.push({ x: x, y: y });
    }
    block.shift();

    return block;
  };

  const calculateTranslateArea = (input_x, input_y) => {
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
  };

  const updatePlayer = (input_x, input_y) => {
    playerInfo.position = position;
    playerInfo.area = area;
    playerInfo.playerState = playerState;

    if (COMMON.PLAYER_CREATE == playerState) {
      setPlayerState(COMMON.PLAYER_MOVE_READY);

      dispatch(updateGridFromPlayer(playerInfo));
    } else if (COMMON.PLAYER_MOVE_READY == playerState) {
      setPlayerState(COMMON.PLAYER_MOVE);

      // dispatch(updateGridFromPlayer(playerInfo));
    } else if (COMMON.PLAYER_ARRIVED === playerState) {
      setPlayerState(COMMON.PLAYER_ARRIVED_DONE);
      setArea([]);

      dispatch(updateGridFromPlayer(playerInfo));
    } else if (COMMON.PLAYER_ARRIVED_DONE === playerState) {
      setPlayerState(COMMON.PLAYER_CREATE);

      setPosition({ x: COMMON.START_X, y: COMMON.START_Y });
      setArea(nextArea);
      setNextArea(genBlock());

      // dispatch(updateGridFromPlayer(playerInfo));
    } else if (COMMON.PLAYER_WAIT_EFFECT === playerState) {
      /* block disappear fx */
    } else if (COMMON.PLAYER_MOVE === playerState) {
      const { result_x, result_y } = calculateTranslateArea(input_x, input_y);
      if (input_y !== 0 && position.y === result_y) {
        setPlayerState(COMMON.PLAYER_ARRIVED);
      }
      playerInfo.position = { x: result_x, y: result_y };
      setPosition({ x: result_x, y: result_y });

      dispatch(updateGridFromPlayer(playerInfo));
    }
  };

  const enableRotateArea = (calArea) => {
    for (const site of calArea) {
      const calc_x = site.x + position.x;
      const calc_y = site.y + position.y;

      if (
        calc_x < 0 ||
        calc_x > COMMON.MAP_WIDTH - 1 ||
        calc_y < 0 ||
        COMMON.GRID_BLOCK === grid[calc_x][calc_y]
      )
        return false;
    }
    return true;
  };

  const rotatePlayer = () => {
    playerInfo.position = position;
    playerInfo.playerState = playerState;

    const newArea = [...area].map((site) => {
      const find = RELATIVE_POSITION.findIndex((relative_site) => {
        if (site.x === relative_site.x && site.y === relative_site.y) {
          return true;
        }
      });
      return RELATIVE_POSITION[(find + 2) % 8];
    });

    if (enableRotateArea(newArea)) {
      playerInfo.area = newArea;
      setArea(newArea);
    } else playerInfo.area = area;

    dispatch(updateGridFromPlayer(playerInfo));
  };

  const onkeydown = (e) => {
    if (playerState !== COMMON.PLAYER_MOVE) return;

    switch (e.key) {
      case "ArrowLeft":
        updatePlayer(-1, 0);
        break;
      case "ArrowRight":
        updatePlayer(1, 0);
        break;
      case "ArrowUp":
        rotatePlayer();
        break;
      case "ArrowDown":
        updatePlayer(0, -1);
        break;
    }
  };

  useEffect(() => {
    if (playerState === COMMON.PLAYER_MOVE) {
      updatePlayer(0, -1);
    } else {
      updatePlayer(0, 0);
    }
  }, [time, playerState]);

  useEffect(() => {
    window.addEventListener("keydown", onkeydown);

    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [position, area]);

  useEffect(() => {
    setArea(genBlock());
    setNextArea(genBlock());
  }, []);

  return [nextArea, setPosition];
};

export default usePlayer;

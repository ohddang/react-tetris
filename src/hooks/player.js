import { useState, useEffect, useContext, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateGrid } from '../redux-toolkit/slice';
import GLOBAL from '../const.js'
import { cloneDeep } from 'lodash';

// 3x3 블럭 모양 랜덤 생성 최대 5개의 셀로 구성 중심점 기준으로 genblock 구현
// 90도 돌때마다 규칙이 있음 규칙에 따라서 정하고
// 상대위치로 {x,y}을 데이터로 하는 배열데이터 구성 / 도형데이터
// 타이머는 하나의 훅으로 구현해서 이곳저곳에서 사용? 아니면 어떻게 쓸지 생각해보기
// myBlock 객체는 중심점 좌표 있어야할듯 초기값으로 중심점좌표 주고 도형데이터(상대좌표) 적용하여 에서 처리
// cellinfo(이름 바꾸던가 해야할듯)

function UsePlayer() {
  const time = useSelector((state) => state.time.value);
  const grid = useSelector((state) => state.grid.value);
  const dispatch = useDispatch();

  const [site, setSite] = useState({ x: GLOBAL.START_X, y: GLOBAL.START_Y });
  const [playerState, setPlayerState] = useState(GLOBAL.PLAYER_MOVE);

  // 시간이나 키 입력에 따른 새로운 위치를 계산해줌
  // 이동 불가 등에 따른 상태값 설정
  // state : move(이동가능한 상태), arrived(도착) -> create(새로 생성)
  function isPossibleMove(input_x, input_y) {
    console.log("isPossibleMove");

    const new_x = site.x + input_x;
    const new_y = site.y + input_y;
    if (input_x !== 0) {
      if (new_x < 0 || new_x > GLOBAL.MAP_WIDTH - 1)
        return false;

      setSite({ x: new_x, y: new_y });

      // MOVE
      let newGrid = cloneDeep(grid);
      newGrid[site.x][site.y] = GLOBAL.GRID_NONE;
      newGrid[new_x][new_y] = GLOBAL.GRID_PLAYER;
      dispatch(updateGrid(newGrid));
    }
    else if (input_y !== 0) {
      if (playerState === GLOBAL.PLAYER_CREATE){
        setPlayerState(GLOBAL.PLAYER_MOVE);
        setSite({x: GLOBAL.START_X, y: GLOBAL.START_Y});

        // CREATE
        let newGrid = cloneDeep(grid);
        newGrid[GLOBAL.START_X][GLOBAL.START_Y] = GLOBAL.GRID_PLAYER;
        dispatch(updateGrid(newGrid));
      }
      else if (playerState === GLOBAL.PLAYER_ARRVIED) {
        // dispatch store set GRID_PLAYER -> GRID_BLOCK
        // action -> block
        setPlayerState(GLOBAL.PLAYER_CREATE);

         // ARRIVED
        let newGrid = cloneDeep(grid);
        newGrid[site.x][site.y] = GLOBAL.GRID_NONE;
        newGrid[new_x][new_y] = GLOBAL.GRID_ARRIVED;
        dispatch(updateGrid(newGrid));
      }
      else {
        if (new_y < 0 || GLOBAL.GRID_BLOCK == grid[new_x][new_y]) {
          setPlayerState(GLOBAL.PLAYER_ARRVIED);
          return false;
        }
        setSite({ x: new_x, y: new_y });

         // MOVE
        console.table(grid);
        console.log(site.x+" "+site.y+" / "+new_x +" "+new_y);
        const prevSite = site;

        let newGrid = cloneDeep(grid);
        newGrid[prevSite.x][prevSite.y] = GLOBAL.GRID_NONE;
        newGrid[new_x][new_y] = GLOBAL.GRID_PLAYER;
        dispatch(updateGrid(newGrid));
      }
    }
  }

  // player의 이동 입력 dispatch
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
  }

  useEffect(() => {
    // console.log("update player : " + playerState);
    // if(playerState === GLOBAL.PLAYER_MOVE)
    {
      isPossibleMove(0, -1);
    }

    window.addEventListener('keydown', onkeydown);
    return () => {
      window.removeEventListener('keydown', onkeydown);
    }
  }, [time]);

  return [site, setSite];
}

export default UsePlayer;
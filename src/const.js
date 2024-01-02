export const GRID_NONE = 0;
export const GRID_BLOCK = 1;
export const GRID_PLAYER = 2;

export const PLAYER_MOVE = 0;
export const PLAYER_ARRIVED = 1;
export const PLAYER_CREATE = 2;
export const PLAYER_WAIT_EFFECT = 3;

export const START_X = 5; // context로 빼자
export const START_Y = 19;

export const MAP_WIDTH = 10;
export const MAP_HEIGHT = 20;

// 상대위치 변수명
// export const RELATIVE_POSITION = [{1,0},{0,1},{-1,0},{0,-1}];

const COMMON = {
  GRID_NONE,
  GRID_BLOCK,
  GRID_PLAYER,
  PLAYER_MOVE,
  PLAYER_ARRIVED,
  PLAYER_CREATE,
  PLAYER_WAIT_EFFECT,
  START_X,
  START_Y,
  MAP_WIDTH,
  MAP_HEIGHT,
};

export default COMMON;

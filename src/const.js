export const GRID_NONE = 0;
export const GRID_BLOCK = 1;
export const GRID_PLAYER = 2;

export const PLAYER_CREATE = 0;
export const PLAYER_MOVE = 1;
export const PLAYER_MOVE_READY = 2;
export const PLAYER_ARRIVED = 3;
export const PLAYER_ARRIVED_DONE = 4;
export const PLAYER_WAIT_EFFECT = 5;
export const PLAYER_DIE = 9;

export const START_X = 5; // context로 빼자
export const START_Y = 19;

export const MAP_WIDTH = 10;
export const MAP_HEIGHT = 20;

const COMMON = {
  GRID_NONE,
  GRID_BLOCK,
  GRID_PLAYER,
  PLAYER_CREATE,
  PLAYER_MOVE,
  PLAYER_MOVE_READY,
  PLAYER_ARRIVED,
  PLAYER_ARRIVED_DONE,
  PLAYER_WAIT_EFFECT,
  PLAYER_DIE,
  START_X,
  START_Y,
  MAP_WIDTH,
  MAP_HEIGHT,
};

export default COMMON;

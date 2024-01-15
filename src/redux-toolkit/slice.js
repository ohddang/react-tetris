import { createSlice } from "@reduxjs/toolkit";
import COMMON from "../const.js";

const levelTime = 30000;
const levelSpeed = [
  1000, 900, 800, 700, 600, 500, 400, 300, 200, 150, 100, 60, 30,
];
const timeInitValue = {
  value: 0,
  level: 1,
  speed: 1000,
  interval: 30,
  remain: levelTime,
  isRunning: true,
};

export const timeSlice = createSlice({
  name: "time",
  initialState: timeInitValue,
  reducers: {
    updateTime: (state, action) => {
      state.interval = action.payload;
      state.value = state.value + action.payload;

      if (state.value > state.speed) {
        state.remain = state.remain - state.value;
        state.value = 0;
      }

      if (state.remain <= 0) {
        if (state.level < levelSpeed.length) {
          state.level = state.level + 1;
          state.speed = levelSpeed[state.level - 1];
          state.remain = levelTime;
          state.value = 0;
        } else {
          state.remain = 999000;
        }
      }
    },
    stopTimer: (state, action) => {
      state.isRunning = false;
    },
    startTimer: (state, action) => {
      state.value = 0;
      state.level = 1;
      state.interval = 30;
      state.speed = levelSpeed[0];
      state.remain = levelTime;
      state.isRunning = true;
    },
  },
});

const gridInitValue = {
  value: new Array(10).fill(0).map(() => new Array(20).fill(COMMON.GRID_NONE)),
  point: 0,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState: gridInitValue,
  reducers: {
    updateGridFromPlayer: (state, action) => {
      const { position, area, playerState } = action.payload;

      const newArea = [{ x: 0, y: 0 }, ...area].map((site) => {
        const calc_x = site.x + position.x;
        const calc_y = site.y + position.y;

        return { x: calc_x, y: calc_y };
      });

      switch (playerState) {
        case COMMON.PLAYER_CREATE:
          state.value = [...state.value].map((row, x) =>
            [...row].map((cell, y) => {
              for (const site of newArea) {
                if (x === site.x && y === site.y) {
                  return (cell = COMMON.GRID_PLAYER);
                }
              }
              return cell;
            })
          );
          break;
        case COMMON.PLAYER_MOVE:
          state.value = [...state.value].map((row, x) =>
            [...row].map((cell, y) => {
              if (cell === COMMON.GRID_PLAYER) cell = COMMON.GRID_NONE;

              for (const site of newArea) {
                if (x === site.x && y === site.y)
                  return (cell = COMMON.GRID_PLAYER);
              }
              return cell;
            })
          );
          break;
        case COMMON.PLAYER_ARRIVED:
          state.value = [...state.value].map((row, x) =>
            [...row].map((cell, y) => {
              if (cell === COMMON.GRID_PLAYER) cell = COMMON.GRID_BLOCK;

              for (const site of newArea) {
                if (x === site.x && y === site.y) {
                  return (cell = COMMON.GRID_BLOCK);
                }
              }
              return cell;
            })
          );
          break;
        case COMMON.PLAYER_ARRIVED_DONE:
          const allBlock = [];

          const blocks = [...state.value];
          for (let y = 0; y < COMMON.MAP_HEIGHT; ++y) {
            let blockCount = 0;
            for (let x = 0; x < COMMON.MAP_WIDTH; ++x) {
              if (COMMON.GRID_BLOCK === blocks[x][y]) ++blockCount;
            }
            if (blockCount === COMMON.MAP_WIDTH) allBlock.push(y);
          }

          const clearLineStart = allBlock.length > 0 ? allBlock[0] : 0;
          const clearLineHeight = allBlock.length;

          if (allBlock.length > 0) {
            for (
              let y = clearLineStart;
              y < COMMON.MAP_HEIGHT - clearLineHeight;
              ++y
            ) {
              for (let x = 0; x < COMMON.MAP_WIDTH; ++x) {
                blocks[x][y] = blocks[x][y + clearLineHeight];
              }
            }

            for (
              let y = COMMON.MAP_HEIGHT - clearLineHeight;
              y < COMMON.MAP_HEIGHT;
              ++y
            ) {
              for (let x = 0; x < COMMON.MAP_WIDTH; ++x) {
                blocks[x][y] = COMMON.GRID_NONE;
              }
            }
            state.point = state.point + clearLineHeight * 10 * clearLineHeight;
            state.value = blocks;
          }
          break;

        case COMMON.PLAYER_RESTART:
          state.value = [...state.value].map((row, x) =>
            [...row].map(() => {
              return COMMON.GRID_NONE;
            })
          );
          state.point = 0;
          break;
      }
    },
  },
});

export const { updateTime, startTimer, stopTimer } = timeSlice.actions;
export const { updateGrid, updateGridFromPlayer } = gridSlice.actions;

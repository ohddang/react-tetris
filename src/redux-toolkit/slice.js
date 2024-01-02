import { createSlice } from "@reduxjs/toolkit";
import COMMON from "../const.js";

const timeInitValue = { value: 0 };

export const timeSlice = createSlice({
  name: "time",
  initialState: timeInitValue,
  reducers: {
    updateTime: (state, action) => {
      state.value = state.value + 1;
    },
  },
});

const gridInitValue = {
  value: new Array(10).fill(0).map(() => new Array(20).fill(COMMON.GRID_NONE)),
};

export const gridSlice = createSlice({
  name: "grid",
  initialState: gridInitValue,
  reducers: {
    // 새로운 플레이어 위치를 전달받아서 새로운 그리드 정보를 업데이트
    updateGrid: (state, action) => {
      state.value = action.payload;
    },
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
              // if (cell === COMMON.GRID_PLAYER) cell = COMMON.GRID_BLOCK;

              for (const site of newArea) {
                if (x === site.x && y === site.y) {
                  return (cell = COMMON.GRID_PLAYER);
                }
              }
              return cell;
            })
          );
          break;
        case COMMON.PLAYER_ARRIVED:
        case COMMON.PLAYER_ARRIVED_DONE:
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
      }
    },
  },
});

export const { updateTime } = timeSlice.actions;
export const { updateGrid, updateGridFromPlayer } = gridSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import GLOBAL from '../const.js'

const timeInitValue = { value: 0 };

export const timeSlice = createSlice({
  name: "time",
  initialState: timeInitValue,
  reducers:{
    updateTime: (state, action) => {
      state.value = action.payload;
    }
  }  
});

const gridInitValue = { value : new Array(10).fill(0).map(() => new Array(20).fill(GLOBAL.GRID_NONE)) };

export const gridSlice = createSlice({
  name: "grid",
  initialState: gridInitValue,
  reducers:{
    // 새로운 플레이어 위치를 전달받아서 새로운 그리드 정보를 업데이트
    updateGrid: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { updateTime } = timeSlice.actions;
export const { updateGrid } = gridSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const timeInitValue = { value: 0};

export const timeSlice = createSlice({
  name: "time",
  initialState: timeInitValue,
  reducers:{
    updateTime: (state, action) => {
      state.value = action.payload;
    }
  }  
});

const gridInitValue = "";

export const gridSlice = createSlice({
  name: "grid",
  initialState: gridInitValue,
  reducers:{
    // player현재 위치 정보 및 시간에 따라 내려가는 state 관리
    playerTimeMove: (state, action) => {
      // y축으로 내려감
      state.value = action.payload;
    },

    // player현재 위치 정보 및 키 입력에 따라 움직이는 state
    playerKeyMove: (state, action) => {
      state.value = action.playload;
    }
  }
});

export const { updateTime } = timeSlice.actions;
export const { playerTimeMove, playerKeyMove } = gridSlice.actions;

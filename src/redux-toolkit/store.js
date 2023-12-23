import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import { gridSlice, timeSlice } from './slice';

export default configureStore({
  reducer:{
    time: timeSlice.reducer,
    grid: gridSlice.reducer,
  }
});

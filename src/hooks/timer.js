import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTime } from "../redux-toolkit/slice";

export function useTimer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(updateTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return;
}

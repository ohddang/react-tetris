import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTime } from "../redux-toolkit/slice";

const interval = 30;
export function useTimer() {
  const isRunning = useSelector((state) => state.time.isRunning);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning) dispatch(updateTime(interval));
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  return;
}

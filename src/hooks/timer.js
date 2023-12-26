import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTime } from '../redux-toolkit/slice';

export function UseTimer(){
  const [time, setTimer] = useState(0);
  const dispatch = useDispatch();

  dispatch( updateTime(time) );

  useEffect( ()=>{
    const timer = setInterval(() => {
      setTimer(preTime => preTime + 1);  
    }, 1000);

    return () => { clearInterval(timer); }
  }, [time]);

  return [time, setTimer];
}
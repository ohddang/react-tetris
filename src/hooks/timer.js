import {useEffect, useState} from 'react'

export function UseTimer(){
  const [time, setTimer] = useState(0);
 
  useEffect( ()=>{
    const timer = setInterval(() => {
      setTimer(preTime => preTime + 1);
      console.log(`update timer ${time}`);
    }, 1000);

    return () => { clearInterval(timer); }
  }, []);

  return [time, setTimer];
}
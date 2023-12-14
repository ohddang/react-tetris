import { useState, useEffect, useContext } from 'react';
import { UseTimer } from './timer';
import { TimerContext } from '../context/timerContext';

// 3x3 블럭 모양 랜덤 생성 최대 5개의 셀로 구성 중심점 기준으로 genblock 구현
// 90도 돌때마다 규칙이 있음 규칙에 따라서 정하고
// 상대위치로 {x,y}을 데이터로 하는 배열데이터 구성 / 도형데이터
// 타이머는 하나의 훅으로 구현해서 이곳저곳에서 사용? 아니면 어떻게 쓸지 생각해보기
// myBlock 객체는 중심점 좌표 있어야할듯 초기값으로 중심점좌표 주고 도형데이터(상대좌표) 적용하여 에서 처리
// cellinfo(이름 바꾸던가 해야할듯)
const START_X = 5; // context로 빼자
const START_Y = 19;

function UsePlayer(){

  // const [time, setTimer] = UseTimer(0);
  const time = useContext(TimerContext);
  const [state, setState] = useState({
    site_x : START_X, 
    site_y : START_Y,
  });
  console.log("update Player");
  //
  // [timer] 의존성
  //
  useEffect(()=> { 
    const newSite_x = state.site_x;
    const newSite_y = state.site_y < 0 ? START_Y : state.site_y - 1;
    // TODO : update player site
    // add isArrived Flag and check
    console.log(`[${time}] x : ${newSite_x}  y : ${newSite_y}`);

    if(state.site_x != newSite_x || state.site_y != newSite_y)
      setState({ site_x: newSite_x, site_y: newSite_y}); }, 
  [time]);

  return [state, setState];
}

export default UsePlayer;
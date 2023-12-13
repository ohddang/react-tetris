import { useState } from 'react';

// 3x3 블럭 모양 랜덤 생성 최대 5개의 셀로 구성 중심점 기준으로 genblock 구현
// 90도 돌때마다 규칙이 있음 규칙에 따라서 정하고
// 상대위치로 {x,y}을 데이터로 하는 배열데이터 구성 / 도형데이터
// 타이머는 하나의 훅으로 구현해서 이곳저곳에서 사용? 아니면 어떻게 쓸지 생각해보기
// myBlock 객체는 중심점 좌표 있어야할듯 초기값으로 중심점좌표 주고 도형데이터 적용하여 cellinfo(이름 바꾸던가 해야할듯)에서 처리
export function UseMyBlock(){
  const [myBlock, setMyBlock] = useState(0); // TODO : object
  
  
  const setMyBlockFunc = () => { 
    setMyBlock(preMyBlock => preMyBlock);
  };

  return [myBlock, setMyBlockFunc];
}
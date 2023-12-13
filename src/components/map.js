import React, { useState, useEffect, useRef } from "react";
import "../CSS/ingame.css"

function Cell({ type }) {
  let cell = [];

  if (type === 1)
    cell.push(<div className='block'></div>);
  if (type === 0)
    cell.push(<div className='none'></div>);
  if (type === 2)
    cell.push(<div className='my'></div>);

  return cell;
}

function Map() {
  // update
  const timerRef = useRef();

  const [count, setCount] = useState(0);
  const [myCell, setMyCell] = useState({
    x: 0,
    y: 0
  });
  const [myShape, setMyShape] = useState({
    myShape: 0, // 모양 타입
    direction: 0, // 방향 타입
  });
  const [speed, setSpeed] = useState(0);
  const [mapInfo, setMapinfo] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 20 }, () => 0))
  );

  const handleCount = () => {
    let isBound = false;

    if(count == 0){ // 처음 시작 and 내 블럭이 바닥에 닿아서 다시 시작
      setMyCell((preMyCell) => ({
        x: 5, y:19
      }));
      
      setMapinfo((prevMapinfo) => {
        const newMapinfo = [...prevMapinfo];
        
        // clear
        if(count != 0){
          for (let y = 19; y >= 0; --y) {
            for (let x = 9; x >= 0; --x) {
              if(y==19)
                newMapinfo[x] = [...prevMapinfo[x]];

              if(myCell.x == x && myCell.y == y)
                newMapinfo[x][y] = 2;
              else if(newMapinfo[x][y] == 2)
                newMapinfo[x][y] = 0;
            }
          }
          // TODO : add flag state and update here
        }
        //
        
        newMapinfo[5]= [...prevMapinfo[5]];
        newMapinfo[5][19] = 2;
        return newMapinfo;
      });
    }
    else{
      console.log(myCell);
      let bound_x = -1; // my -> block
      let bound_y = -1;
      
      if(myCell.y == 0 || mapInfo[myCell.x][myCell.y - 1] == 1){
        bound_x = myCell.x;
        bound_y = myCell.y;
        isBound = true;
      }
      else
        setMyCell((preMyCell) => ({ x: preMyCell.x, y: preMyCell.y-1})); // 충돌 안할때만 아래로 내려감
      
      setMapinfo((prevMapinfo) => {
        const newMapinfo = [...prevMapinfo];
        for (let y = 19; y >= 0; --y) {
          for (let x = 9; x >= 0; --x) {
            if(y==19)
              newMapinfo[x] = [...prevMapinfo[x]];

            if (bound_x == x && bound_y == y ){ // my -> block
              if(isBound){
                newMapinfo[x][y] = 1;
              }
            }
            else if(myCell.x == x && myCell.y == y) //
              newMapinfo[x][y] = 2;
            else{
              if(newMapinfo[x][y] != 1)
                newMapinfo[x][y] = 0;
            }   
          }
        }
        return newMapinfo;
      });
    }
    if(isBound){
      setCount( preCount=> 0 );
    }else
      setCount(precount => precount + 1);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleCount, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  });

  // draw
  function makeGrid() {
    let grid = [];
    for (let y = 19; y >= 0; --y) {
      for (let x = 9; x >= 0; --x) {
          grid.push(<Cell type={mapInfo[x][y]}/>);
      }
    }
    return grid;
  }

  return (
    <div className='grid'>
      {makeGrid()}
    </div>
  );
};

export default Map;
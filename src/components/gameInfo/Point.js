import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Point = ({ isMax }) => {
  const number_1 = useRef();
  const number_10 = useRef();
  const number_100 = useRef();
  const number_1000 = useRef();
  const number_10000 = useRef();

  const number_array = [
    number_1,
    number_10,
    number_100,
    number_1000,
    number_10000,
  ];

  let point = useSelector((state) => state.grid.point);
  if (isMax) {
    const max_point = localStorage.getItem("MAX_POINT");
    if (max_point === null || max_point < point) {
      localStorage.setItem("MAX_POINT", point);
    } else {
      point = max_point;
    }
  }

  const updaeNumberImage = () => {
    // 이미지 로드 시간 문제인지 업데이트가 간헐적으로 늦게됨
    let temp_point = point;
    for (let i = 0; i < number_array.length; ++i) {
      const imageURL =
        temp_point >= 1
          ? process.env.PUBLIC_URL + `/images/${temp_point % 10}.png`
          : process.env.PUBLIC_URL + `/images/none.png`;
      number_array[i].current.style.backgroundImage = `url(${imageURL})`;
      temp_point = Math.floor(temp_point / 10);
    }

    if (point === 0) {
      number_1.current.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/0.png)`;
    }
  };

  useEffect(() => {
    updaeNumberImage();
  }, [point]);

  return (
    <div className="number_group">
      <div className="number_image" ref={number_10000}></div>
      <div className="number_image" ref={number_1000}></div>
      <div className="number_image" ref={number_100}></div>
      <div className="number_image" ref={number_10}></div>
      <div className="number_image" ref={number_1}></div>
    </div>
  );
};

export default Point;

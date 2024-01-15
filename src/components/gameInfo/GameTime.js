import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const GameTime = () => {
  const remain = useSelector((state) => state.time.remain);
  const number_1 = useRef();
  const number_10 = useRef();
  const number_100 = useRef();

  const number_array = [number_1, number_10, number_100];

  const updaeNumberImage = () => {
    let temp_remain = Math.round(remain / 1000);

    for (let i = 0; i < number_array.length; ++i) {
      const imageURL =
        temp_remain >= 1
          ? process.env.PUBLIC_URL + `/images/${temp_remain % 10}.png`
          : process.env.PUBLIC_URL + `/images/none.png`;
      number_array[i].current.style.backgroundImage = `url(${imageURL})`;
      temp_remain = Math.floor(temp_remain / 10);
    }

    if (Math.round(remain / 1000) === 0) {
      number_1.current.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/0.png)`;
    }
  };

  useEffect(() => {
    updaeNumberImage();
  }, [remain]);

  return (
    <>
      <div className="number_group">
        <div className="number_image" ref={number_100}></div>
        <div className="number_image" ref={number_10}></div>
        <div className="number_image" ref={number_1}></div>
      </div>
    </>
  );
};

export default GameTime;

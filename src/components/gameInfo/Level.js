import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Level = () => {
  const level = useSelector((state) => state.time.level);
  const number_1 = useRef();
  const number_10 = useRef();
  const number_100 = useRef();

  const number_array = [number_1, number_10, number_100];

  const updaeNumberImage = () => {
    let temp_level = level;
    for (let i = 0; i < number_array.length; ++i) {
      const imageURL =
        temp_level >= 1
          ? process.env.PUBLIC_URL + `/images/${temp_level % 10}.png`
          : process.env.PUBLIC_URL + `/images/none.png`;
      number_array[i].current.style.backgroundImage = `url(${imageURL})`;
      temp_level = Math.floor(temp_level / 10);
    }
  };

  useEffect(() => {
    updaeNumberImage();
  }, [level]);

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

export default Level;

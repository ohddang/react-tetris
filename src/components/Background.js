import { useRef, useEffect } from "react";

const Background = () => {
  const background = useRef(null);

  const createBackgroundImage = () => {
    const images = [];

    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < 10; j++) {
        const index = Math.floor(Math.random() * 4) + 1;
        const top = i * 10;
        const left = j * 10 + 2;
        const rotate = Math.floor(Math.random() * 180);

        const el = document.createElement("div");
        el.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/back_${index}.png)`;
        el.className = "background_image";

        const theta = Math.floor(Math.random() * 3) - 1;
        console.log(theta);
        el.style.top = `${top + theta}%`;
        el.style.left = `${left + theta}%`;
        el.style.transform = `rotate(${rotate}deg)`;

        images.push(el);
      }
    }
    console.log(images.length);

    for (const image of images) {
      background.current.appendChild(image);
    }
  };

  useEffect(() => {
    createBackgroundImage();
    // 모든 자식 삭제
    return () => {
      while (background.current.hasChildNodes()) {
        background.current.removeChild(background.current.firstChild);
      }
    };
  }, []);

  return (
    <>
      <div className="background" ref={background}></div>
    </>
  );
};

export default Background;

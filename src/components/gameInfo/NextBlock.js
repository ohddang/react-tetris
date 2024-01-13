import { useState, useEffect } from "react";

const NextBlock = ({ area }) => {
  if (area == undefined || area.length == 0) return;

  const isExistIndex = (area, x, y) => {
    for (const site of area) {
      if (site.x === x && site.y === y) return true;
    }
    return false;
  };

  const updateNextBlock = () => {
    const blocks = [];

    const newArea = [...area, { x: 0, y: 0 }];
    for (let y = 1; y > -2; --y) {
      for (let x = -1; x < 2; ++x) {
        if (isExistIndex(newArea, x, y)) {
          blocks.push(<div className="block" />);
        } else {
          blocks.push(<div className="none" />);
        }
      }
    }

    return blocks;
  };

  return (
    <>
      <article>Next</article>
      <div className="next_block_container">
        <div className="next_block">{updateNextBlock()}</div>
      </div>
    </>
  );
};

export default NextBlock;

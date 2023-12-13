import { useState } from 'react';
import { UseMyBlock } from './myBlock';

 export function UseCellInfo() {
  const [cellInfo, setCellInfo] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 20 }, () => 0))
  );
  const [myBlock, setMyBlock] = UseMyBlock();

  const setCellInfoFunc = () => {
    setCellInfo(preCellInfo => preCellInfo);
  };

  return [cellInfo, setCellInfoFunc];
}

import { useState } from 'react';

 export function UseMapInfo() {
  const [mapInfo, setMapInfo] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 20 }, () => 0))
  );

  const returnFunction = () => {
    setMapInfo(preMapInfo => preMapInfo);
  };

  return [mapInfo, returnFunction];
}

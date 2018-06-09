import React from 'react';
//import { fromXY } from './../../services/Coord';

export const MapPlayerBackground = ({ player, maxX, maxY, cellSizeX, cellSizeY }) => {
  const x = player.x;
  const y = player.y;
  if (isNaN(x) || isNaN(y) || x < 0 || y < 0) return false;
  const evenShiftX = 0.5 * cellSizeX;
  return (
    <div className='map-player-background'>
      <div
        key={y}
        className="desert-row"
        style={{ left: ((y % 2) ? evenShiftX : 0), top: (y * cellSizeY / 2), width: cellSizeX * maxX }}
      >
        <div
          key={x}
          className='desert-cell-player'
          style={{ left: x * cellSizeX, top: 0, width: cellSizeX, height: cellSizeY }}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default { MapPlayerBackground };

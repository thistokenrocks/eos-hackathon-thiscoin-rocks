import React from 'react';
// import { fromXY } from './../../services/Coord';
// import styled from 'styled-components';

export const MapBackGround = ({ maxX, maxY, cellSizeX, cellSizeY, cells }) => {
  const rows = []; for (let y = 0; y < maxY; y++) rows.push(y);
  const cols = []; for (let x = 0; x < maxX; x++) cols.push(x);
  const evenShiftX = 0.5 * cellSizeX;
  const debug = process.env.REACT_APP_DEBUG;
  return (
    <div className='map-background'>
      {rows.map(row => (
        <div
          key={row}
          className="outerspace-row"
          style={{ left: ((row % 2) ? evenShiftX : 0), top: (row * cellSizeY / 2), width: cellSizeX * maxX }}
        >
          {cols.map(column => {
            if (column === (maxX-1) && row % 2) return false;
            return (
              <div
                key={column}
                className="outerspace-cell"
                style={{ left: column * cellSizeX, top: 0, color: 'black' }}
              >
                {(debug) ? <h3 style={{ fontFamily: 'arial', display: 'block' }}>{column}:{row}</h3>: false}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  )
};

export default { MapBackGround };

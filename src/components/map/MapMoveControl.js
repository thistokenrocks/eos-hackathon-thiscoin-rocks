import React from 'react';
import { fromXY } from './../../services/Coord';

const isAdjacent = (fromX, fromY, toX, toY) => {
  if (!(fromX !== toX || fromY !== toY)) return false;
  if ((fromY % 2) === 0) {
    return (
      (toX === (fromX-1) && toY === (fromY-1)) ||
      (toX === (fromX-1) && toY === (fromY+1)) ||
      //(toX === fromX && toY === (fromY-2)) ||
      (toX === fromX && toY === (fromY-1)) ||
      (toX === fromX && toY === (fromY+1)) 
      //(toX === fromX && toY === (fromY+2))
    );
  } else {
    return (
      //(toX === fromX && toY === (fromY-2)) ||
      (toX === fromX && toY === (fromY-1)) ||
      (toX === fromX && toY === (fromY+1)) ||
      //(toX === fromX && toY === (fromY+2)) ||
      (toX === (fromX+1) && toY === (fromY-1)) ||
      (toX === (fromX+1) && toY === (fromY+1))
    );
  }
};

export const MapMoveControl = ({ player, maxX, maxY, cellSizeX, cellSizeY, teams, onClick }) => {
  const rows = []; for (let y = 0; y < maxY; y++) rows.push(y);
  const cols = []; for (let x = 0; x < maxX; x++) cols.push(x);
  const evenShiftX = 0.5 * cellSizeX;
  const isBusy = (coord) => (typeof teams[coord] !== 'undefined');
  const isEnemy = (coord) => (teams[coord] && teams[coord].team !== player.token);
  return (
    <div className='map-move-control'>
      {rows.map(row => {

        let anyValid = false;
        cols.forEach(column => {
          if (column === (maxX - 1) && row % 2) return;
          if (!isAdjacent(column, row, player.x, player.y)) return;
          anyValid = true;
        });
        if (!anyValid) return null; // skip rows that have no columns

        return (
          <div
            key={row}
            className="desert-row"
            style={{ left: ((row % 2) ? evenShiftX : 0), top: (row * cellSizeY / 2), width: cellSizeX * maxX }}
          >
            {cols.map(column => {
              if (column === (maxX-1) && row % 2) return false;
              if (!isAdjacent(column, row, player.x, player.y)) return false;
              let extClass = '';
              const coord = fromXY(column, row);
              if (isBusy(coord) && isEnemy(coord)) { extClass += ' attack'; }
              return (
                <button
                  key={column}
                  title={JSON.stringify(teams[coord])}
                  className={`desert-cell-control${extClass}`}
                  onClick={() => onClick(coord)}
                  style={{ cursor: 'pointer', left: column * cellSizeX, top: 0, width: cellSizeX, height: cellSizeY }}
                >
                  &nbsp;
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  )
};

export default { MapMoveControl };

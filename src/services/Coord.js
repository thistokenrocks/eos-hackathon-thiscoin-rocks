export const toXY = (coord) => {
    let intval = coord;
    if (typeof coord === 'object') intval = parseInt(coord.toString(), 10);
    else if (typeof coord === 'string' && coord.substring(0, 2) === '0x') intval = parseInt(coord, 16);
    const x = intval & 0xFFFF;
    const y = intval >> 16;
    return {x, y};
};

export const fromXY = (x, y) => {
  if (x < 0 || y < 0) return -1;
  return (x + (y << 16));
};

export const cellToXY = ({ x, y, dim }) => {
  const evenShiftX = 0.5 * dim.cellSizeX;
  const marginTop = 0; // towerHeight - cellSizeY;
  return {
    x: ((y % 2) ? evenShiftX : 0) + x * dim.cellSizeX + dim.cellSizeX * 0.5,
    y: (y * dim.cellSizeY / 2) - marginTop + dim.cellSizeY * 0.5
  };
};

export default { toXY, fromXY, cellToXY };

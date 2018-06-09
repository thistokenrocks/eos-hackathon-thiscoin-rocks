
export const isValidZoom = ({ availableZooms }, zoom) => (availableZooms.indexOf(parseFloat(zoom)) > -1);

export const zoomInValue = ({ availableZooms, zoom }) => {
  const zoomIndex = availableZooms.indexOf(zoom);
  return (zoomIndex >= 0 && availableZooms[zoomIndex + 1] !== undefined) ?
    availableZooms[zoomIndex + 1] : zoom;
};

export const zoomOutValue = ({ availableZooms, zoom }) => {
  const zoomIndex = availableZooms.indexOf(zoom);
  return (zoomIndex > 0 && availableZooms[zoomIndex - 1] !== undefined) ?
    availableZooms[zoomIndex - 1] : zoom;
};

export const canZoomIn = ({ availableZooms, zoom }) => {
  const zoomIndex = availableZooms.indexOf(zoom);
  return (zoomIndex >= 0 && availableZooms[zoomIndex + 1] !== undefined);
};

export const canZoomOut = ({ availableZooms, zoom }) => {
  const zoomIndex = availableZooms.indexOf(zoom);
  return (zoomIndex >= 0 && availableZooms[zoomIndex - 1] !== undefined);
};

export const canZoomDefault = ({ zoom }) => (zoom !== 1);

export default { isValidZoom, zoomInValue, zoomOutValue, canZoomIn, canZoomOut, canZoomDefault };

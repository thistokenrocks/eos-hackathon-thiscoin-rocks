import { connect } from 'react-redux';
import Map from './../components/Map';
import { getMapProperties } from './../services/MapProperties';
import { fire } from './../services/Gtag';
import { canZoomIn, canZoomOut } from './../services/Zoom';

const mapStateToProps = (state) => {
  const { map } = state;
  const { availableZooms, zoom } = map;
  const can = {
    zoomIn: canZoomIn( { availableZooms, zoom }),
    zoomOut: canZoomOut( { availableZooms, zoom })
  };
  return {
    ...getMapProperties(state),
    map, can, zoom, availableZooms
  };
};

const getTouchCoord = e => {
  if (!e.touches) return {};
  return {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  }
};

const getEventCoord = e => ({
  x: e.pageX,
  y: e.pageY
});

const mapDispatchToProps = (dispatch) => ({
  onTouchStart: (e) => {
    const {x, y} = getTouchCoord(e);
    fire({ action: 'TOUCH_START', category: 'map' });
    dispatch({ type: 'MAP_MOUSE_DOWN', x, y });
  },
  onTouchEnd: (e) => {
    dispatch({ type: 'MAP_MOUSE_UP' });
    fire({ action: 'TOUCH_END', category: 'map' });
  },
  onTouchMove: (e) => {
    const {x, y} = getTouchCoord(e);
    dispatch({ type: 'MAP_MOUSE_MOVE', x, y });
  },
  onScroll: (e) => {
    console.error('onScroll', e);
  },
  onMouseDown: (e) => {
    const {x, y} = getEventCoord(e);
    dispatch({ type: 'MAP_MOUSE_DOWN', x, y });
    e.preventDefault();
  },
  onMouseMove: (e) => {
    const {x, y} = getEventCoord(e);
    dispatch({ type: 'MAP_MOUSE_MOVE', x, y });
    e.preventDefault();
  },
  onMouseUp: (e) => {
    dispatch({ type: 'MAP_MOUSE_UP' });
    fire({ action: 'MOUSE_UP', category: 'map' });
    e.preventDefault();
  },
  onZoomIn: () => {
    dispatch({ type: 'ZOOM_IN' });
    fire({ action: 'ZOOM', category: 'map', label: 'button', value: 1 });
  },
  onZoomOut: () => {
    dispatch({ type: 'ZOOM_OUT' });
    fire({ action: 'ZOOM', category: 'map', label: 'button', value: -1 });
  },
  onMouseWheel: (e) => {
    if ( e.deltaY < 0 ) {
      dispatch({ type: 'ZOOM_IN' }); e.preventDefault();
      fire({ action: 'ZOOM', category: 'map', label: 'wheel', value: 1 });
    } else if ( e.deltaY > 0 ) {
      dispatch({ type: 'ZOOM_OUT', payload: null }); e.preventDefault();
      fire({ action: 'ZOOM', category: 'map', label: 'wheel', value: -1 });
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);


import { zoomInValue, zoomOutValue, isValidZoom } from './../services/Zoom';
// import { getEventAnimation, getEventStartResult, getEventResult } from './../services/ContractEvents';
import { toXY, fromXY } from './../services/Coord';

const initialState = {
  selectedBlock: 'latest',
  dragging: false,
  start: {x: 0, y: 0},
  operations: [{ type: 'initializing' }],
  x: 0,
  y: 0, // it depends on size of the map actually
  zoom: 1.25,
  availableZooms: [0.33, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.25, 2.5],
  cities: {},
  teams: {},
  health: {},
  rating: [],
  blockNumber: -1,
  player: {},
  dim: {
    cellSizeX: 212,
    cellSizeY: 130,
    towerHeight: 212,
     // temporary hardcode for demo
    maxX: 4, // 7
    maxY: 5  // 15
  },
  free: [],
  animation: {},
  confirmation: false // whether current operation required confirmation
};

const getDefaultZoom = ({ width, height }) => {
  if ( window.innerWidth < 500 ) return 0.5;
  if ( height > 30 ) return 0.33;
  return 0.5;
};


export default function (state = initialState, action) {
  switch (action.type) {
    case 'BLOCKCHAIN_INFO': {
      const info = action.payload;
      return {
        ...state,
        blockNumber: info.head_block_num
      };
    }
    case 'MAP_CLOSED': {
      return {
        ...state,
        cities: {}, teams: {}, health: {}, blockNumber: 0, rating: [], x: 0, y: 0, player: {}, operations: [], animation: {}, free: [],
        selectedBlock: 'latest',
        dragging: false
      };
    }
    case 'MAP_ADD_OPERATION': {
      const operation = action.payload;
      const operations = state.operations.slice();
      if (operations.indexOf(operation) === -1) operations.push(operation);
      return { ...state, operations };
    }
    case 'MAP_REMOVE_OPERATION': {
      const operation = action.payload;
      const operations = state.operations.filter(t => {
        if (operation.id && t.id !== operation.id) return true;
        if (operation.hash && t.hash !== operation.hash) return true;
        if (operation.type && t.type !== operation.type) return true;
        return false;
      });
      return { ...state, operations };
    }
    case 'MAP_READY_TO_PLAY': {
      const { player, blockNumber } = action.payload;
      const newPlayer = {};
      if (!player || !player[0] || player[0] === "0x0000000000000000000000000000000000000000") {
        newPlayer.token = '';
        newPlayer.x = -1;
        newPlayer.y = -1;
        newPlayer.coord = fromXY(-1, -1);
        newPlayer.health = 0;
      } else {
        const coord = parseInt(player[1].toString(), 10);
        const { x, y } = toXY(coord);
        newPlayer.token = player[0];
        newPlayer.coord = coord;
        newPlayer.x = x;
        newPlayer.y = y;
        newPlayer.health = parseInt(player[2].toString(), 10)
      }
      return { ...state, player: newPlayer, blockNumber };
    }
    case 'LATEST_BLOCK_RECEIVED': {
      const { doc } = action.payload;
      const { cities, teams, health, blockNumber, width, height } = doc;
      const rating = []; // getRating(teams, cities);
      const position  = { x: 0, y: 0, zoom: getDefaultZoom({ width, height }) };
      return { ...state, cities, teams, health, blockNumber, rating, ...position };
    }
    case 'MAP_MOUSE_DOWN': {
      const start = { x: action.x - state.x, y: action.y - state.y };
      return {...state, start, dragging: true };
    }
    case 'MAP_MOUSE_MOVE': {
      if (state.dragging) {
        const shift = {x: action.x - state.start.x, y: action.y - state.start.y};
        return {...state, ...shift};
      }
      break;
    }
    case 'MAP_MOUSE_UP': {
      return {...state,  start: { x: 0, y: 0 }, dragging: false };
    }
    case 'ZOOM_DEFAULT': {
      return { ...state, zoom: 1 };
    }
    case 'ZOOM_IN': {
      return { ...state, zoom: zoomInValue(state) };
    }
    case 'ZOOM_OUT': {
      return { ...state, zoom: zoomOutValue(state) };
    }
    case 'ZOOM_UPDATED': {
      return { ...state, zoom: isValidZoom(state, action.payload) ? action.payload : state.zoom };
    }
/*
    case 'CONTRACT_EVENT_STARTED': {
      return { ...state, ...getEventStartResult(state, action.payload, action.account), ...getEventAnimation(state, action.payload) };
    }
    case 'CONTRACT_EVENT_RECEIVED': {
      return { ...state, ...getEventResult(state, action.payload, action.account), blockNumber: action.payload.blockNumber };
    }
    case 'CONTRACT_EVENT_RELEASED': {
      // when playing has been stopped
      const operations = state.operations.filter(o => o.type !== 'playing');
      return { ...state, operations };
    }
*/
    default:
      break;
  }
  return state;
}

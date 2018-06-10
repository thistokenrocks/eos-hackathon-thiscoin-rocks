import { CellsMock } from './mock/cells.mock';
import { CoinsMock } from './mock/coins.mock';
import { PlayersMock } from './mock/players.mock';

const initialState = {
  maps: {
      loaded: true,
      rows: [
          { id: 'hackaton', name: 'EOS Hackaton HK', contractAccount: 'thiscoin' }
      ] 
  },
  cells: {
      loaded: false,
      error: null,
      rows: CellsMock || []
  },
  coins: {
      loaded: false,
      error: null,
      rows: CoinsMock || []
  },
  players: {
      loaded: false,
      error: null,
      rows: PlayersMock || []
  }
};


export default function(state = initialState, action) {
  switch (action.type) {
    case 'LIST_RECEIVED': {
      const { source, rows } = action.payload;
      return { ...state, [source]: { loaded: true, error: null, rows } };
    }
    case 'LIST_ERROR': {
      const { source, error } = action.payload;
      return { ...state, [source]: { loaded: true, error, rows: [] } };
    }
    default:
      return state;
  }
};

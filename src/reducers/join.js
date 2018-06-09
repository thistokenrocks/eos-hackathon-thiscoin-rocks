const safeEmpty = x => ((!x) ? '' : x);

const initialState = {
  isLoaded: false,
  isBlocked: false,
  isJoined: false,
  filter: safeEmpty(localStorage.getItem('coinFiltration')),
  entering: {
    mode: false,
    title: ''
  },
  selectedTeam: {},
  dropArea: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LATEST_BLOCK_RECEIVED': {
      return { ...state, isLoaded: false };
    }
    case 'MAP_READY_TO_PLAY': {
      return { ...state, isLoaded: true };
    }
    case 'MAP_ENTER_TITLE': {
      return { entering: { mode: action.payload, title: action.oldName } };
    }
    case 'MAP_CLOSED': {
      return { ...state, isLoaded: false };
    }
    case 'INIT_NETWORK': {
      // const { net, accountId } = action.payload;
      break;
    }
    case 'UPDATE_TEAM_FILTER': {
      localStorage.setItem('coinFiltration', action.payload );
      return { ...state, filter: action.payload };
    }
    case 'SELECT_TEAM': {
      return {...state, selectedTeam: action.payload};
    }
    case 'CANCEL_TEAM': {
      return {...state, selectedTeam: {}, dropArea: {}};
    }
    case 'CONTRACT_EVENT_STARTED': {
      return {...state, isBlocked: true };
    }
    case 'CONTRACT_EVENT_RELEASED': {
      return {...state, isBlocked: false };
    }
    default:
      break;
  }
  return state;
}

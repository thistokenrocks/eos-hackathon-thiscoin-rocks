const initialState = {
  width: typeof window === 'object' ? window.innerWidth : 1024,
  height: typeof window === 'object' ? window.innerHeight : 800
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SCREEN_RESIZE': {
      if (typeof window === 'object') {
        return { ...state, width: window.innerWidth, height: window.innerHeight }
      }
      break;
    }
    default:
  }
  return state
};

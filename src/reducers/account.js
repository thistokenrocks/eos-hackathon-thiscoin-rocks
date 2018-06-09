
const defaultStateNoNetwork = {
  scatter: undefined,
  net: { isMain: false, id: -1, title: 'NO NETWORK', error: '' },
  accountId: '',
  accountIndex: 0,
  balance: [],
  noEOS: false,
  canPlay: false
};

const initialState = { ...defaultStateNoNetwork };

const defineAbilityToPlay = (state) => {
  let canPlay = true;
  if (!state.scatter) canPlay = false;
  else if (!state.accountId) canPlay = false;
  return { ...state, canPlay };
};

const noBalance = (balance) => {
  return false;
};

export default function(state = initialState, action) {
  switch (action.type) {

    case 'NO_METAMASK': {
      return { ...defaultStateNoNetwork, metamask: false, canPlay: false };
    }
    case 'NO_METAMASK_NETWORK_MATCH': {
      return defineAbilityToPlay({ ...state, canPlay: false });
    }
    case 'INIT_WEB3_ACCOUNT_INDEX': {
      const { index, accountId } = action.payload;
      return { ...state, accountIndex: index, accountId };
    }
    case 'INIT_NETWORK': {
      let netId = action.payload;
      const net = {
        isMain: netId === '1',
        id: netId || -1,
        title: 'EOS.IO NET',
        error: ''
      };
      const result = defineAbilityToPlay({ ...state, metamask: true, net });
      return result;
    }
    case 'INIT_ACCOUNT': {
      return defineAbilityToPlay({ ...state, ...action.payload, noEOS: noBalance(action.payload.balance) });
    }
    case 'SET_ACCOUNT_BALANCE': {
      if (!action.payload) return state;
      return { ...state, balance: action.payload, noBalance: noBalance(action.payload) };
    }
    default:
      return state;
  }
};

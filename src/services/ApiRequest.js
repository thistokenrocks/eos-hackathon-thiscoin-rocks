
const getRoot = () => {
  return process.env.REACT_APP_PROXY || 'http://localhost:9111/api';
};

const fetchJson = (url, options = {}) => {
  return fetch(getRoot() + url, options).then(res => res.json());
};

const fetchBlockchainTable = table => fetchJson(`/${table}`);

export const Cells = {
  fetch: () => (fetchBlockchainTable('cells'))
};
export const Players = {
  fetch: () => (fetchBlockchainTable('players'))
};
export const Coins = {
  fetch: () => (fetchBlockchainTable('coins'))
};


export default {
  Cells, Players, Coins
};

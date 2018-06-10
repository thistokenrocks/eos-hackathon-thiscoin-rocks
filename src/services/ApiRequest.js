
const code = 'thiscoin';
const fetchBlockchainTable = (table, pk) => (
  window.eos.getTableRows(true, code, code, table, pk, 1000)
);

export const Cells = {
  fetch: () => (fetchBlockchainTable('cells', 'index'))
};
export const Players = {
  fetch: () => (fetchBlockchainTable('players', 'name'))
};
export const Coins = {
  fetch: () => (fetchBlockchainTable('coins', 'coin'))
};


export default {
  Cells, Players, Coins
};

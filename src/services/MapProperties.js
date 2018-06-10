// import { fromXY } from './Coord';

const getRating = (coins) => {
  if (!coins || !coins.rows) return [];
  return coins.rows.sort((a, b) => {
    if (b.num_players === a.num_players) return a.name.localeCompare(b.name);
    return (b.num_players - a.num_players);
  });
};

const getWinnerInRating = (rating) => {
  return rating[0] ? rating[0]: {};
};

export const getMapProperties = (state) => {
  const { map, router, account, screen } = state;
  const { maps, coins, cells, players } = state.list;
  
  const { match } = router;
  const mapId = 'hackaton';
  const hasMap = true;   
  const { dim, blockNumber } = map;
  const player = {};
  const operations = [];
  const rating = getRating(coins);
  const winner = getWinnerInRating(rating);

  return { 
    maps, coins, players, cells,
    rating, winner,
    map, hasMap, match, router, screen, account, mapId, dim, player, operations, blockNumber 
  };
};

export default { getMapProperties };

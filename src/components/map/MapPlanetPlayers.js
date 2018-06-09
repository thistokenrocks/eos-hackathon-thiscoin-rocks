import React from 'react';
import TeamDetails from './TeamDetails';

export const MapPlanetPlayers = ({ coins, players, cells, dim }) => {
  if (!cells || !cells.rows) return false;
  if (!players || !players.rows) return false;

  const { cellSizeX, cellSizeY } = dim;
  const evenShiftX = 0.5 * cellSizeX;
  const styleCounter = {
    width: '100%', color: 'white', textAlign: 'center', padding: 0,
    fontWeight: 'bold', fontSize: 16, marginTop: 20
  };
  const cityShiftX = 138;
  const cityShiftY = 30;
  // const getCoinInfo = coinIndex => (coins.rows.find(c => (c.coins === coinIndex)));
  
  return (
    <div className='map-planet-players'>
      {cells.rows.filter(cell => (cell.defence > 0 && cell.players.length > 0)).map(cell => {
        const count = cell.players.length;
        const teamX = cell.x;
        const teamY = cell.y;
        const coord = cell.index;
        const defence = cell.defence;
        const lastPlayerId = cell.players[count-1];
        const player = players.rows.find(p => (p.name === lastPlayerId));
        if (!player) {
          console.log('no player, players=', players);
          return false;
        }
        const health = player.health; // player.health get player health properly team.health || 100;
        const health_bar = { width: (100 - health) * 54 / 100.0 };
        health_bar.left = 54 - health_bar.width;

        const coin = coins.rows.find(c_rec => (c_rec.coin === player.coin));
        return (
          <div key={`team-at-${coord}`} style={{
            position: 'absolute',
            left: ((teamY % 2) ? evenShiftX : 0) + teamX * cellSizeX + cityShiftX,
            top: (teamY * cellSizeY / 2) + cityShiftY,
            zIndex: 811,
            background: 'url(/hex1.png) no-repeat',
            backgroundSize: 'contain',
            width: 50,
            // border: '1px yellow dashed',
            height: 'auto'
          }}>
            <TeamDetails {...{ coin, cell }} />
            <div className="planet-level-defence">
              {defence}
            </div>
            <div className="team-player-planet-img">
              <div className="team-player-health" style={health_bar}></div>
              <img src={`/icons/${coin.icon}`} alt={''} style={{ marginTop: 5, marginLeft:3, width: '28px', height: 'auto' }} />
            </div>
            <div className='counter' style={styleCounter}>
              {count}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default { MapPlanetPlayers };

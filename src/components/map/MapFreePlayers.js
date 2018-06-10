import React from 'react';
import TeamDetails from './TeamDetails';

export const MapFreePlayers = ({ coins, players, cells, dim }) => {
  if (!cells || !cells.rows) return false;
  if (!players || !players.rows) return false;

  const { cellSizeX, cellSizeY } = dim;
  const evenShiftX = 0.5 * cellSizeX;
  const styleCounter = {
    width: '100%', color: 'white', textAlign: 'center', 
    padding: 0, fontWeight: 'bold', fontSize: 16,
    marginLeft: 53
  };

  const cellShiftX = cellSizeX / 2 - 30;
  const cellShiftY = 0;
  const marginTop = 0;
  // const getCoinInfo = coinIndex => (coins.rows.find(c => (c.coins === coinIndex)));
  return (
    <div className='map-free-players'>
      {cells.rows.filter(cell => (cell.defence === 0 && cell.players.length > 0)).map(cell => {
        const count = cell.players.length;
        const teamX = cell.x;
        const teamY = cell.y;
        const coord = cell.index;
        const lastPlayerId = cell.players[count-1];
        const player = players.rows.find(p => (p.name === lastPlayerId));
        if (!player) {
          console.log('no player, players=', players);
          return false;
        }
        const coin = coins.rows.find(c_rec => (c_rec.coin === player.coin));
        if (!coin) return false;
        
        const health = player.health; // player.health get player health properly team.health || 100;
        const health_bar = { width: (100 - health) * 54 / 100.0 };
        health_bar.left = 54 - health_bar.width;

        const cls = 'player';        
        return (
          <div className={'l0'} key={`team-${coord}`} style={{
            left: ((teamY % 2) ? evenShiftX : 0) + teamX * cellSizeX,
            top: (teamY * cellSizeY / 2) - marginTop,
            width: cellSizeX,
            height: cellSizeX
          }}>
            <div className={cls} key={`team-at-${coord}`} style={{
              position: 'absolute',
              left: -60 + cellShiftX,
              top: -30 + cellShiftY + marginTop,
              zIndex: 911,
              background: 'url(/planets/spaceship.png) no-repeat',
              backgroundSize: '100%',
              width: 180,
              height: 130
            }}>
              <TeamDetails {...{ cell, coin }} />
              <div className="team-player-img" title={`${teamX}:${teamY}`}>
                <div className="team-player-health" style={health_bar}></div>
                <img src={`/icons/${coin.icon}`} alt={''} style={{ marginTop: 5, marginLeft:3, width: '28px', height: 'auto' }} />
              </div>
              <div className='counter' style={styleCounter}>
                {count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default { MapFreePlayers };

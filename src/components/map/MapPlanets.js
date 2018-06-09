import React from 'react';
// import styled from 'styled-components';

const DisplayTitle = ({ title, canUpdate, onUpdate }) => {
  if (!canUpdate) {
    if (title) return (<div className='planet-title'>{title}</div>);
    return false;
  }
  const noTitleYet = canUpdate && !title;
  if (noTitleYet) {
    return (
      <button className="planet-title-add" onClick={onUpdate}>
        Add Planet Name
      </button>
    );
  }
  return (
    <div>
      <div className='planet-title'>
        <strong>{title}</strong>
        &nbsp; &nbsp;
        <button className='btn btm-sm btn-primary' onClick={onUpdate} style={{ lineHeight: 1, height: 30, padding: '2px 10px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ width: '70%', fill: 'white' }}>
            <path d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const canUpgrade = ({ defence, count }) => {
  const d = parseInt(defence, 10);
  if (d === 2) return (count > 10);
  if (d === 3) return (count > 50);
  if (d === 4) return (count > 100);
  if (d === 5) return (count > 250);
  if (d === 6) return (count > 1000);
  if (d === 7) return (count > 2500);
  return true;
};

const DisplayUpgrade = ({ defence, count, account, onClick }) => {
  if (count < 1 || defence >=  8) return false;
  if (!account) return false;
  //if (!parseInt(account.net.id, 10) === 0) {
    // require some count - only for production network
  if (!canUpgrade({ defence, count, account })) return false;
  //}
  return (
    <button className='planet-upgrade' onClick={onClick}>
      <small>
        <span style={{ color: '#ccc' }}>
          Defense:
        </span>
        &nbsp;
        <strong>x{(parseInt(defence,10)+1)}</strong>
        <br/>
      </small>
      Upgrade Defense
    </button>
  );
};

const pad2 = x => ((x < 10) ? `0${x}`: x);

export const MapPlanets = ({ cells, dim, teams, player, account, canUpdate, onUpgrade, onTitleEnter, onTitleCancel }) => {
  const { cellSizeX, cellSizeY } = dim; // , towerHeight
  const evenShiftX = 0.5 * cellSizeX;
  const marginTop = 90; // towerHeight - cellSizeY;
  let planetIndex = 1;
  const planets = cells.rows.filter(cell => (cell.defence >= 1));
  return (
    <div className='map-planets'>
      {planets.map(planet => {

        const { x, y, defence, players, title, index } = planet;
        const hasPlayers = players && players.length;
        const activePlayer = (player && parseInt(player.index, 10) === parseInt(index, 10));

        // condition whether title can be modified
        const canUpdateTitle = canUpdate && activePlayer;
        const canUpgrade = canUpdateTitle && hasPlayers;
        planetIndex ++;
        return (
          <div
            className='planet'
            key={index}
            style={{
              left: ((y % 2) ? evenShiftX : 0) + x * cellSizeX,
              top: (y * cellSizeY / 2) - marginTop
            }}
          >
            <DisplayTitle
              title={title}
              canUpdate={canUpdateTitle}
              onUpdate={() => onTitleEnter(title)}
            />
            {(canUpgrade) ? (
              <DisplayUpgrade
                account={account}
                defence={defence}
                count={players.length}
                onClick={() => onUpgrade({ account })}
              />
            ) : false}
            <img 
              src={`/planets/p${pad2(2 * (planetIndex % 12) + 1 )}.png`} 
              alt={`${x}:${y}`} style={{ border: 0 }}
              />
          </div>
        );
      })}
    </div>
  );
};

export default { MapPlanets };

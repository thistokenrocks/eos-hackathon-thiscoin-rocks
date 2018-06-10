import React from 'react';

class TeamDetails extends React.Component {
  render() {
    const { coin, cell } = this.props;
    if (!coin || !cell.players) return false;
    const count = cell.players.length;
    if (!count) return false;
    const { defence } = cell;
    const lastPlayer = cell.players[count - 1];
    const { health } = lastPlayer;
    return (
      <div className='team-popup'>
        <div className='team-name'>
          <strong>
            {coin.name}
          </strong>
        </div>
        <div className='team-count'>
          {count} player{count !== 1 ? 's' : ''}
        </div>
        <div className='team-health'>
          Stamina: &nbsp; <strong>{health || 100}</strong> / <strong>100</strong>
        </div>
        {defence > 0 ? (
          <div className='defense'>
            Defence: <span className='x'>x{(parseInt(defence, 10) + 1)}</span>
          </div>
        ) : false}
      </div>
    );
  }
}

export default TeamDetails;

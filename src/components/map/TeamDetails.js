import React from 'react';

class TeamDetails extends React.Component {
  render() {
    const { coin, cell } = this.props;
    if (!coin) return false;
    return false;
    /*
    return (
      <div className='team-popup'>
        <div className='team-name'>
          <strong>
            {(token.doc.symbol !== token.key) ? <span className='symbol'>{token.doc.symbol} </span> : ''}
            {token.key}
          </strong>
        </div>
        {team && team.count ? (
          <div className='team-count'>
            {team.count} player{team.count !== 1 ? 's' : ''}
          </div>
        ) : false}
        <div className='team-health'>
          Stamina: &nbsp; <strong>{team.health || 100}</strong> / <strong>100</strong>
        </div>
        {city ? (
          <div className='defense'>
            Defence: <span className='x'>x{(parseInt(city.defence, 10) + 1)}</span>
          </div>
        ) : false}
      </div>
    );*/
  }
}

export default TeamDetails;

import React, { Component } from 'react';
import HeaderContainer from './../containers/top/HeaderContainer';

class Rating extends Component {
  render() {
    const { mapId, blockNumber, rating } = this.props;
//    if (!rating) return false;
    return (
      <div>
        <HeaderContainer />
        <h1>Top Communities</h1>
        <div className="container">
          <div className="map-label">
            <span style={{ color: '#ff9206' }}>MAP: &nbsp;</span>
            <strong style={{ color: 'white' }}>{mapId ? mapId : ''}</strong>
          </div>
          <div className="map-label">
            <span style={{ color: '#ff9206' }}>Block Number: &nbsp;</span>
            <strong style={{ color: 'white' }}>{blockNumber}</strong>
          </div>
          <div className="table-responsive">
            <table className="table rating">
              <thead>
                <tr>
                  <th>Token Community</th>
                  <th style={{ width: 60 }}>Players</th>
                  <th style={{ width: 60 }}>Planets</th>
                </tr>
              </thead>
              <tbody>
                {rating && rating.map(row => {
                  return (
                    <tr key={row.coin}>
                      <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {row.icon ? (
                          <div style={{ display:'inline-block', width: 40 }}>
                            <img src={`/icons/${row.icon}`} alt='' style={{ width: 20 }} />
                          </div>
                        ) : false}
                        <strong>
                          {row.name}
                        </strong>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {row.num_players ? row.num_players : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {row.num_planets ? row.num_planets : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

       </div>
      </div>
    );
  }
}

export default Rating;


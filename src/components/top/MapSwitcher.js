import React, { Component } from 'react';
import styled from 'styled-components';
import { DesktopScreen } from 'react-responsive-redux';

const Wrapper = styled.div`
  text-align: center;
  button {
    border: 1px transparent solid;
    background: url(/media/bk-dark.png) 0px 0px;
    cursor: pointer;
    padding: 5px 10px;
    outline: none;
    color: #ff9900;
    white-space: nowrap;
    display: block;
    width: 100%;
    text-align: right;
    > span > div { display: inline; color: #999; }
  }
  button .label {
    color: #999;
  }
  button:hover {
    border: 1px #aaa solid;
  }
  button.choice {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
`;

const getNetworkTitle = (netId) => {
  return 'EOS';
};

const BlockNumber = ({ value }) => {
  if (!value || value === -1) return null;
  return (
    <div style={{ fontSize: 11, marginTop: -5 }}>
      <span style={{ color: '#eee' }}>
        Last Block: &nbsp;
      </span>
      <strong>{value}</strong>
    </div>
  );
};

class MapSwitcher extends Component {

  state = { open: false };

  onOpen = () => {
    this.setState({ open: true });
  };

  onSelect = (doc) => {
    const pathParts = this.props.router.location.pathname.split('/');
    pathParts[1] = doc._id;
    const url = pathParts.join('/');
    this.setState({ open: false });
    this.props.onNavigate(url);
  };

  render() {
    const { hasMap, mapId, maps, map, blockNumber } = this.props;
    if (!maps || !hasMap || !map) return false;
    const moreThan1 = maps.rows.length > 1;
    if (!moreThan1) {
      return (
        <Wrapper>
          <button>
            <span><DesktopScreen>Map: </DesktopScreen></span>
            <strong>{mapId}</strong> ({getNetworkTitle(map.networkId)})
            <BlockNumber value={blockNumber} />
          </button>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {!this.state.open ? (
          <button onClick={this.onOpen}>
            <DesktopScreen><span className="label"> &nbsp; Map: &nbsp; </span></DesktopScreen>
            <strong>{mapId}</strong> ({getNetworkTitle(map.networkId)}) ▾
            <BlockNumber value={blockNumber} />
          </button>
        ) : (
          <div>
            <span className="label" style={{ float: 'right' }}>
              &nbsp; &nbsp; &nbsp;
              Switch To
              &nbsp; &nbsp; &nbsp;
            </span>
            {maps.rows.map(m => (
              <button className='choice' onClick={() => (this.onSelect(m.doc))} key={m.doc._id}>
                {m.id === mapId ? <strong>{m.doc.name}</strong>: m.doc.name}
              </button>
            ))}
          </div>
        )}
      </Wrapper>
    );
  }
}

export default MapSwitcher;

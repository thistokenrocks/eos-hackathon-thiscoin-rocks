import React, { Component } from 'react';
import styled from 'styled-components';
import './Map.css';
import HeaderContainer from './../containers/top/HeaderContainer';
import { ZoomControl, MapBackGround, MapFreePlayers, MapPlanetPlayers, MapPlanets } from './map';

const Wrapper = styled.div`
  overflow: hidden;
`;

class Map extends Component {

  root = null;
  state = {
    scrollTop: null,
    width: 0,
    height: 0
  };

  updateScroll = () => {
    const rect = this.root.getBoundingClientRect();
    const scrollTop = rect.top + window.pageYOffset || document.documentElement.scrollTop;
    this.setState({ scrollTop, width: rect.width, height: rect.height });
  };

  componentDidMount() {
    this.updateScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.screen) !== JSON.stringify(nextProps.screen)) {
      this.updateScroll();
    }
  }

  render() {
    const { screen, mapId, dim, players, coins, cells } = this.props;
    if (!mapId) return false;
    const height = screen.height - this.state.scrollTop;
    const { x, y } = this.props.map;
    // const animation = { type: "AttackerDeath", token: "0xa89b5934863447f6e4fc53b315a93e873bda69a3", oldX: 0, oldY: 3, x: 1, y: 3 };

    // const { width, height } = this.state;
    const w = screen.width;
    const h = height;
    // const scrollTop = this.state.scrollTop;

    const centerX = w / 2;
    const centerY = h / 2;

    const getOuterSpaceSize = () => ({
      width: dim.cellSizeX * dim.maxX,
      height: dim.cellSizeY * dim.maxY / 2 + dim.cellSizeY * 0.5
    });

    const { zoom, can, onZoomIn, onZoomOut } = this.props;
    const outerspace = getOuterSpaceSize({ dim });
    const { onTouchStart, onTouchEnd, onTouchMove } = this.props;
    const { onMouseDown, onMouseMove, onMouseUp, onMouseWheel } = this.props;

    return (
      <div className={`map-${mapId}`} style={{ overflow: 'hidden' }}>
        <HeaderContainer />
        <div
          ref={(c) => { this.root = c; }}
          className='map'
          style={{ height, position: 'relative' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onWheel={onMouseWheel}
        >
          <ZoomControl {...{ zoom, can, onZoomIn, onZoomOut, height: h }} />
          {(dim && dim.cellSizeY && dim.maxY && this.state.width) ? (
            <Wrapper className="outerspace-wrapper" style={{ width: w, height: h }}>
              {/*
                <pre style={{ position: 'absolute', zIndex: 100, left: 200, color: 'white' }}>
                  {JSON.stringify({ zoom })}
                </pre>
              */}

              <div style={{
                position: 'absolute', zIndex: 101,
                left: centerX - 4, top: centerY - 4, width: 8, height: 8
              }}>
              </div>

              <div className="outerspace" style={{
                transform: 'scale(' + zoom + ')',
                marginLeft: x * zoom  - outerspace.width / 2 + w / 2,
                marginTop: y * zoom - outerspace.height / 2 + h / 2,
                width: outerspace.width,
                height: outerspace.height,
                cursor: 'move'
              }}>
                <MapBackGround { ...dim} cells={cells} />
                <div style={{ position: 'relative' }}>
                  <MapPlanets dim={dim} cells={cells} />
                  {/*<MapPlayerBackground {...dim} player={player} />*/}
                  <MapPlanetPlayers {...{dim, cells, players, coins}} />
                  <MapFreePlayers {...{ dim, cells, players, coins }} />
                  {/*<MapAnimation dim={dim} animation={map.animation} cities={map.cities} teams={map.teams} */}
                  
                </div>
              </div>
            </Wrapper>
           ) : false}
        </div>
      </div>
    );
  }

}

export default Map;

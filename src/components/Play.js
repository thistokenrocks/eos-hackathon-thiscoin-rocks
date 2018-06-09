import React, { Component } from 'react';
import HeaderContainer from './../containers/top/HeaderContainer';
import { JoinDialog, CoinList, CityTitleModal } from './Play/index';
import { MapBackGround } from './map/index';
import { cellToXY } from './../services/Coord';
import TextInput from './controls/TextInput';
// import BlockchainLoading from './controls/BlockchainLoading';

class Play extends Component {

  root = null;
  state = {
    scrollTop: null,
    width: 0,
    height: 0
  };

  updateScroll = () => {
    if (this.root) {
      const rect = this.root.getBoundingClientRect();
      const scrollTop = rect.top + window.pageYOffset || document.documentElement.scrollTop;
      this.setState({scrollTop, width: rect.width, height: rect.height});
    }
  };

  componentDidMount() {
    this.updateScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.screen) !== JSON.stringify(nextProps.screen) ||
      JSON.stringify(this.props.player) !== JSON.stringify(nextProps.player) ||
      this.props.coins.loaded !== nextProps.coins.loaded ||
      JSON.stringify(this.props.operations) !== JSON.stringify(nextProps.operations)
    ) {
      setTimeout(this.updateScroll, 50);
    }
  }

  render() {
    const {
      screen, dim, mapId, operations, cells, teams, icons, animation, account, player, free,
      canPlay, coins, join, canJoin, onSelectTeam, onCancelTeam, onJoin, onMove
    } = this.props;

    // if (!tokens || !tokens.loaded) return (<Loader />);
     // if (!tokens.rows || !tokens.rows.length) return false;
    const height = screen.height - this.state.scrollTop;

    const zoom = 1;
    const { x, y } = cellToXY({ x: player.x, y: player.y, dim, zoom });

    const { onChangeFilter, onUpgrade, onUpdateTitle, onTitleEnter, onTitleCancel } = this.props;
    if (join.entering && join.entering.mode) return (
      <div>
        <HeaderContainer />
        <CityTitleModal
          height={height} title={join.entering.title} account={account}
          onSubmit={onUpdateTitle} onCancel={onTitleCancel}
        />
      </div>
    );

    const canUpdate = (operations.length === 0); // do not allow to update cities
    const isInitializing = (operations.filter(o => (o.type === 'initializing')).length > 0);
    const isPlaying = (operations.filter(o => (o.type === 'playing')).length > 0);
    const isJoining = (operations.filter(o => (o.type === 'joining')).length > 0);
    const isLoadingMap = (operations.filter(o => (o.type === 'loadingMap')).length > 0);
    const styleMap = { height, overflow: 'hidden', background: '#000', color: 'white', position: 'relative' };
    return (
      <div>
        <HeaderContainer />
        <div ref={(c) => { this.root = c; }}>
          <div>
            {player.token && player.health ? (
              <div className='map' style={styleMap}>
                <div className="outerspace" style={{
                    transform: 'scale(' + zoom + ')',
                    marginLeft: this.state.width / 2 - x,
                    marginTop: this.state.height / 2 - y,
                    width: dim.cellSizeX * dim.maxX,
                    height: dim.cellSizeY * dim.maxY / 2 + zoom * dim.cellSizeY * 0.5
                  }}>
                  <MapBackGround { ...dim} cells={cells} />
                  <div style={{ position: 'relative' }}>
                    {/*<MapPlayerBackground {...dim} player={player} />
                    <MapPlanets {...{ dim, cells, teams, player, account, canUpdate, onUpgradeCity, onCityTitleEnter, onCityTitleCancel }} />
                    <MapPlanetPlayers dim={dim} cells={cells} teams={teams} icons={icons} coins={coins} />
                    <MapFreePlayers dim={dim} cells={cells} teams={teams} icons={icons} tokens={coins} />
                    <MapAnimation dim={dim} animation={animation} cells={cells} teams={coins} icons={icons} />
                    <MapMoveControl
                      { ...dim} cells={cells} teams={coins} player={player}
                      onClick={(coord) => (onMove({ alert, account, coord }))}
                    />
                    */}
                  </div>
                  {(isPlaying) ? (
                    <div
                      style={{
                        position: 'absolute', cursor: 'no-drop', overflow: 'hidden',
                        top: '-50%', left: '-50%', width: this.state.width * 10, height: this.state.height * 10,
                        background: 'white', opacity: 0.15, zIndex: 15001
                      }}
                    >
                    </div>
                  ) : false}
                </div>
              </div>
            ) : (
              <div>
                {(canPlay) ? (
                  <div className="container-fluid">
                    {(!isInitializing && !isJoining && !isLoadingMap) ? (
                      <div>
                        <p style={{ textAlign: 'center', color: 'white', fontSize: 20, margin: 30, fontWeight: 'bold', marginBottom: 0 }}>
                          Please Select Your Coin to Join the Game
                        </p>
                        <div style={{ margin: '10px 0px' }}>
                          <TextInput
                            style={{ background: '#fff', color: '#000', outline: 'none !important' }}
                            value={join.filter} onChange={onChangeFilter} placeholder="Search The Coin..."
                          />
                        </div>
                        <CoinList { ...{join, coins, onSelectTeam}}/>
                      </div>
                      ) : false}
                    {(canJoin ? (<div style={{ height: 80 }}> &nbsp;</div>) : false)}
                    <JoinDialog { ...{mapId, operations, join, free, canJoin, player, account, onJoin, onCancelTeam}} />
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: 50, color: 'red' }}>Sorry, cannot play yet</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Play;

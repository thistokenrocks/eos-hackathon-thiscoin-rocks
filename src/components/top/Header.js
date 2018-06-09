import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import WalletContainer from './../../containers/top/WalletContainer';
import MapSwitchContainer from './../../containers/top/MapSwitchContainer';
import './Header.css';
import { DesktopScreen, DesktopScreenHidden } from 'react-responsive-redux'
import { Winner, WinnerLogo } from './Winner';
import { NoMapMenu } from './../menu/NoMapMenu';
import ExternalLink from './../controls/ExternalLink';
import { MenuPullDown, ActiveMenuLink } from './../menu/MobileMenu';

class Header extends Component {
  render() {
    const { hasMap, mapId, winner, icon } = this.props;
    if (!hasMap) return <NoMapMenu { ...this.props} />;
    return (
      <div style={{ minWidth: 310 }}>
        <DesktopScreenHidden>
          <div style={{ position: 'fixed', background: '#000', zIndex: 9999, top: 105, left: 0, textAlign: 'right', right: 0, boxShadow: '0px 2px 2px #ff9900' }}>
            <MapSwitchContainer />
            <div style={{ background: 'red', paddingBottom: 5 }}>
              <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>
		cannot play on mobile yet                
              </div>
              <div style={{ textAlign: 'center', fontSize: 12, color: '#ffffff' }}>
                please use desktop computer with <ExternalLink href="https://scatter-eos.com/">Scatter</ExternalLink> to play
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: 210 }}> &nbsp; </div>
        </DesktopScreenHidden>
        <nav>
          <div className="tcr"></div>
          <WinnerLogo winner={winner} />
          <DesktopScreenHidden>
            <div className='container-fluid'>
              <MenuPullDown {...this.props} />
              <ul style={{ flex: 1 }}>
                <li style={{ flex: 1 }}></li>
                <li>
                  <ActiveMenuLink {...this.props} />
                </li>
                <li style={{ flex: 1 }}></li>
                <li style={{ flex: 1 }}></li>
              </ul>
            </div>
          </DesktopScreenHidden>
          <DesktopScreen>
            <Winner {...{winner, mapId}} />
            <div className='container-fluid'>
              <ul style={{ flex: 1 }}>
                <li>
                  <NavLink activeClassName='active' to={`/${mapId}/play`}>
                    {icon ? <img src={icon} alt={''} style={{ height: 28, width: 'auto', marginRight: 10 }} /> : ''}
                    Play
                  </NavLink>
                </li>
                <li><NavLink activeClassName='active' to={`/${mapId}/map`}>Map</NavLink></li>
                <li><NavLink activeClassName='active' to={`/${mapId}/rating`}>Rating</NavLink></li>
                <li style={{ flex: 1 }}></li>
                <li><NavLink activeClassName='active' to={`/${mapId}/about`}>The Game</NavLink></li>
                <li className="top-right">
                  <WalletContainer />
                  <MapSwitchContainer />
                </li>
              </ul>
            </div>
          </DesktopScreen>
        </nav>
        <DesktopScreen>
          <div style={{ position: 'relative', minHeight: 105 }}> &nbsp; </div>
        </DesktopScreen>
      </div>
    )
  };
};

export default Header;

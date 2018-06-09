import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars } from './../icon/Bars';

const getMenuItems = (props) => {
  const { icon } = props;
  const map = {
      play: (<span>{icon ? <img src={icon} alt={''} style={{ marginRight: 10 }} /> : ''} Play</span>),
      map: 'Map',
      rating: 'Rating',
      about: 'The Game'
  };
  return map;
};

export const ActiveMenuLink = (props) => {
  const { pathname, mapId } = props;
  const items = getMenuItems(props);
  const found = Object.keys(items).find(key => (pathname === `/${mapId}/${key}`));
  if (found) {
    return <NavLink className='active' to={`/${mapId}/${found}`}>{items[found]}</NavLink>;
  }
  return null;
};

export class MenuPullDown extends Component {
  state = {
    open: false
  };

  onClose = () => {
    return this.setState({ open: false });
  };
  onOpen = () => {
    return this.setState({ open: true });
  };

  render() {
    if (this.state.open) {
      const { mapId } = this.props;
      const items = { ...getMenuItems(this.props) };
      delete items.play;
      delete items.settings;
      return (
        <div>
          <button
            onMouseDown={this.onClose}
            onClick={this.onClose}
            style={{
              border: 0, position: 'fixed', zIndex: 19999, top: 0, right: 0,
              width: '100%', height: '100%', overflow: 'hidden', opacity: 0.5, background: '#ff9900'
            }}
          >
          </button>
          <div className="mobile-mnu">
            <div className="mobile-mnu-header">Navigate:</div>
            {Object.keys(items).map(key => (
              <NavLink
                onClick={this.onClose}
                key={key} className='mobile-mnu-item'
                activeClassName='active' to={`/${mapId}/${key}`}
              >
                {items[key]}
              </NavLink>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="mnu-pull">
        <button
          onClick={this.onOpen}
          onMouseDown={this.onOpen}
          className="btn btn-primary"
        >
          <Bars size={22}/>
        </button>
      </div>
    );
  }
}

export default { MenuPullDown, ActiveMenuLink };

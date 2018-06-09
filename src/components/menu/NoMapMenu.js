import React from 'react';
import { NavLink } from 'react-router-dom';
// import { TabletScreenHidden } from 'react-responsive-redux';
// at the beginning: <div style={{ minWidth: 310 }}><nav><div className="ttr"></div>

export const NoMapMenu = (props) => (
  <div className="container-fluid" style={{ minWidth: 310 }}>
    <nav>
      <ul>
        <li><NavLink activeClassName='active' to={`/about`}>The Game</NavLink></li>
        <li className='only-desktop' style={{ flex: 1 }}></li>
        <li style={{ textAlign: 'right', color: 'gray' }}>No Maps Loaded</li>
      </ul>
    </nav>
  </div>
);

export default { NoMapMenu };

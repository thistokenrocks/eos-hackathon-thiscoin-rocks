import React from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';


class Anchor extends React.Component {
  render() {
    return (
      <HashLink to={`#${this.props.id}`} id={this.props.id} style={{ textDecoration: 'none', color: 'black' }}>
        <h2>{this.props.children}</h2>
      </HashLink>
    );
  }
}

Anchor.propTypes = {
  name: PropTypes.string
};

export default Anchor;

import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="preloader-mask">
        <div className="preloader"></div>
      </div>
    );
  }
}

export default Loader;

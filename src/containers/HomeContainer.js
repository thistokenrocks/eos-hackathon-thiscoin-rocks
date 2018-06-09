import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = ({ maps }) => {
  if (maps.rows.length === 0) {
    // we do not have maps
    return (<Redirect to={`/about`} />);
  } else {
    return (<Redirect to={`/${maps.rows[0].id}/map`} />);
  } 
};

const mapStateToProps = (state) => ({
  maps: state.list.maps
});

export default connect(mapStateToProps, undefined)(Home);

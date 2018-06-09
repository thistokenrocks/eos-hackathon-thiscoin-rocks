import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import MapSwitcher from './../../components/top/MapSwitcher';
import { getMapProperties } from './../../services/MapProperties';

const mapStateToProps = state => {
  return getMapProperties(state);
};

const mapDispatchToProps = dispatch => ({
  onNavigate: (url) => {
    dispatch(push(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSwitcher);

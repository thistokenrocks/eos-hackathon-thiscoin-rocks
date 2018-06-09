import { connect } from 'react-redux';
import Header from './../../components/top/Header';
import { getMapProperties } from './../../services/MapProperties';

const mapStateToProps = (state) => {
  return getMapProperties(state);
};

export default connect(mapStateToProps, undefined)(Header);


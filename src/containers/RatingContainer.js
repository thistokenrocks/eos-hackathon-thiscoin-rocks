import { connect } from 'react-redux';
import Rating from './../components/Rating';
import { getMapProperties } from './../services/MapProperties';

const mapStateToProps = (state) => { return getMapProperties(state); };

export default connect(mapStateToProps, undefined)(Rating);

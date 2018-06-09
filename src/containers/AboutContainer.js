import { connect } from 'react-redux';
import About from './../components/About';
import { getMapProperties } from './../services/MapProperties';

const mapStateToProps = (state) => ({
    screen: state.screen,
    ...getMapProperties(state)
});

export default connect(mapStateToProps, undefined)(About);

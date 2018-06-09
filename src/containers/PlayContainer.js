import { connect } from 'react-redux';
// import { toastr } from 'react-redux-toastr';
import Play from './../components/Play';
import { getMapProperties } from './../services/MapProperties';
// import { fire } from './../services/Gtag';
// import HeaderContainer from './../containers/top/HeaderContainer';

const mapStateToProps = (state) => {
  return {
    noEOS: state.account.noEOS,
    canPlay: state.account.canPlay, // i.e. whether there is a balance
    join: state.join,
    canJoin: state.join.selectedTeam && state.join.selectedTeam.id,
    ...getMapProperties(state)
  };
};

//const notify = ({ header = 'Please wait...', title, tx }) => {
//  toastr.info('Please wait...', title + ' ' + tx);
//  console.log('tx=', tx);
// };

//const sendCallback = ({ account, title, operationType, dispatch }) => {
  //const internalId = (new Date().getTime()) + ("-" + Math.random()).replace('0.', '');
  //const nextOp = { type: operationType, id: internalId };
  //if (account.hasPlugin) nextOp.confirmation = true;
  //dispatch({ type: 'MAP_ADD_OPERATION', payload: nextOp });
//  return (
  //  (err, tx) => {
  //  }
  //);
// };

const mapDispatchToProps = (dispatch) => ({
  onSelectTeam: (id) => {
    dispatch({ type: 'SELECT_TEAM', payload: id });
  },
  onCancelTeam: () => {
    dispatch({ type: 'CANCEL_TEAM' });
  },
  onChangeFilter: (value) => {
    dispatch({ type: 'UPDATE_TEAM_FILTER', payload: value });
  },
  onUpgrade: ({ account }) => {
  },
  onTitleEnter: (oldName) => {
    dispatch({ type: 'MAP_ENTER_CITY_TITLE', payload: true, oldName });
  },
  onTitleCancel: () => {
    dispatch({ type: 'MAP_ENTER_CITY_TITLE', payload: false });
  },
  onUpdateTitle: ({ account, title }) => {
  },
  onMove: ({ account, coord }) => {
  },
  onJoin: ({ docTeam, player, account, free }) => {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);

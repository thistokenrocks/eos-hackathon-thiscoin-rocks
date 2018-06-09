import { connect } from 'react-redux';
import { Wallet } from './../../components/top/Wallet';
import { getMapProperties } from './../../services/MapProperties';

const mapStateToProps = state => {
  const { account } = state;
  const { map } = getMapProperties(state);
  return {
    account,
    networkMatch: map && account.net && parseInt(account.net.id, 10) === parseInt(map.networkId, 10)
  };
};

export default connect(mapStateToProps, undefined)(Wallet);

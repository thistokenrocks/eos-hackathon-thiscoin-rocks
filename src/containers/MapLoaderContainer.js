import React from 'react';
import { connect } from 'react-redux';
import Debounced from './../services/Debounced';
import { fire } from './../services/Gtag';
import { getMapProperties } from './../services/MapProperties';

class MapLoader extends React.Component {

  loadMap = (props) => {
    this.props.onClose();
    Debounced.start('map-loader-load-map', () => {
      this.props.onDownloadMap(props);
    }, 500);
  };

  componentWillMount() {
    const { maps, router, account } = this.props;
    const pathname = router.location.pathname;
    fire({ action: 'PAGE', category: pathname, label: account.accountId })

    if (maps && maps.rows && maps.rows.length) { // only when we have maps loaded
      const m = this.props.maps.rows.filter(map => (map.id === this.props.mapId));
      if (m && m.length) {
        Debounced.start('loadMap', () => {
          console.log('Loading map from componentWillMount', this.props.account);
          this.loadMap({
            initialDoc: m[0].doc,
            account: this.props.account
          });
        }, 500);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const pathname_account = ({ router, account }) => ({
      path: router.location.pathname,
      account: account.accountId
    });
    const v1 = pathname_account(this.props)
    const v2 = pathname_account(nextProps);
    if (v1.path !== v2.path || v1.account !== v2.account) {
      fire({ action: 'PAGE', category: v2.path, label: v2.account })
    }

    if (
      JSON.stringify(nextProps.maps) !== JSON.stringify(this.props.maps) ||
      JSON.stringify(nextProps.account.net) !== JSON.stringify(this.props.account.net) ||
      nextProps.account.accountId !== this.props.account.accountId ||
      nextProps.mapId !== this.props.mapId
    ) {
      Debounced.start('loadMap', () => {
        const m = nextProps.maps.rows.filter(map => (map.id === nextProps.mapId));
        if (m && m.length) {
          const { account } = nextProps;
          console.log('Loading map from componentWillReceiveProps', account);
          this.loadMap({ initialDoc: m[0].doc, account });
        }
      }, 500);
    }

  }

  render() {
    return (<div></div>); // no displaying for the component
  }
}

const mapStateToProps = state => {
  const { account } = state;
  return {
    ...getMapProperties(state), account
  };
};

const mapDispatchToProps = dispatch => ({
  onClose: () => (dispatch({ type: 'MAP_CLOSED' })),

  onDownloadMap: ({ initialDoc, account }) => {
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapLoader);

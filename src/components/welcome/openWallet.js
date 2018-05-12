import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PlayCircle } from 'emerald-js-ui/lib/icons3';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import launcher from 'store/launcher';
import { waitForServicesRestart } from 'store/store';
import { useRpc } from '../../store/launcher/launcherActions';
import { MainnetLocal } from '../../lib/rpc/gethProviders';

const Render = ({ save, muiTheme }) => {
  return (
    <Row style={{textAlign: 'center'}}>
      <Col xs={12} style={{marginTop: '3rem', marginBottom: '1.5rem'}}>
        <div style={{fontWeight: '300'}}>
          <p style={{fontSize: '1.5rem'}}>
            Welcome to Webchain Wallet<br/>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis malesuada ipsum. Donec varius sollicitudin ipsum, sed malesuada nunc pharetra nec.
          </p>
        </div>
      </Col>
      <Col xs={12}>
        <FlatButton label="Open Wallet"
          // icon={<PlayCircle style={{color: muiTheme.palette.alternateTextColor}}/>}
          style={{backgroundColor: muiTheme.palette.primary1Color, color: muiTheme.palette.alternateTextColor}}
          onClick={save}/>
      </Col>
    </Row>
  );
};


Render.propTypes = {
  save: PropTypes.func.isRequired,
};

const OpenWallet = connect(
  (state, ownProps) => ({
  }),
  (dispatch, ownProps) => ({
    save: () => {
      // Use mainnet local by default, as we don't have remote nodes yet
      dispatch(useRpc(MainnetLocal));

      dispatch(launcher.actions.saveSettings());
      waitForServicesRestart();
    },
  })
)(Render);

export default muiThemeable()(OpenWallet);

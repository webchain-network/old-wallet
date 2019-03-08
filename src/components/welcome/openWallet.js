import React from 'react';
import { connect } from 'react-redux';
import { PlayCircle } from '@emeraldplatform/ui-icons';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Button from '../../elements/Button';
import screen from '../../store/wallet/screen';

const Render = ({ numberOfAccounts, nextPage }) => {
  return (
    <Row>
      <Col xs={12}>
        <div style={{fontWeight: '300'}}>
          <p>
            Welcome to Webchain Wallet<br/>
          </p>
          <p>
            Webchain is a transparent, web-mineable blockchain platform, made to support Decentralized Applications (DApps), where websites can serve as a hardware-independent alternative to secure ERC20 & ERC223 smart contracts​.
          </p>
        </div>
      </Col>
      <Col xs={12}>
        <Button
          primary
          label="Open Wallet"
          icon={<PlayCircle />}
          onClick={() => nextPage(numberOfAccounts)}
        />
      </Col>
    </Row>
  );
};

const OpenWallet = connect(
  (state, ownProps) => ({
    numberOfAccounts: state.accounts.get('accounts').size,
  }),
  (dispatch, ownProps, state) => ({
    nextPage: (numberOfAccounts) => {
      dispatch(screen.actions.gotoScreen(numberOfAccounts === 0 ? 'landing' : 'home'));
    },
  })
)(Render);

export default muiThemeable()(OpenWallet);

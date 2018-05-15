import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import Immutable from 'immutable';
import CircularProgress from 'material-ui/CircularProgress';
import TransactionsHistory from '../../../components/tx/TxHistory';
import AccountsList from '../../../components/accounts/AccountList';
import Header from './header';
import { LogoIcon } from '../../../elements/Icons';
import logoText from '../../../logoText.png';
import theme from '../../../theme.json';

const styles = {
  statusMessage: {
    color: '#00c2fc',
    marginTop: '15px',
  },
};

const Dashboard = (props) => {
  const { connecting, statusMessage } = props;

  if (connecting) {
    document.body.style.backgroundColor = '#141417';
    let messageBlock = <span style={styles.statusMessage}><CircularProgress size={25} /> {statusMessage}</span>;

    const body = <div>
      <Row center="xs">
        <Col xs={12}>
          <img src={logoText} style={{height: '42px'}} />
        </Col>
      </Row>
      <Row center="xs" style={{paddingTop: '40px', height: '40px'}}>
        <Col xs>
          {messageBlock}
        </Col>
      </Row>
    </div>;

    return (
      <div>
        <Grid style={{maxWidth: '1150px', backgroundColor: '#141417'}}>
          <Row center="xs" middle="xs" style={{paddingTop: '6%'}}>
            <Col xs>
              <LogoIcon width="250" height="250" />
            </Col>
          </Row>
          {body}
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <AccountsList/>
      <TransactionsHistory/>
    </div>
  );
};

Dashboard.propTypes = {
  connecting: PropTypes.bool.isRequired,
  statusMessage: PropTypes.string,
};

export default connect(
  (state, ownProps) => ({
    accounts: state.accounts.get('accounts', Immutable.List()),
    connecting: state.launcher.get('connecting'),
    statusMessage: state.launcher.get('message').get('text'),
  }),
  (dispatch, ownProps) => ({
  })
)(Dashboard);

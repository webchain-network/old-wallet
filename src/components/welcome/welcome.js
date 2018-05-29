import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';
import theme from '../../theme.json';

import { LogoIcon } from '../../elements/Icons';
import InitialSetup from './initialSetup';
import version from '../../version';

import logoText from '../../logoText.png';

const Render = ({ message, level, ready, needSetup, muiTheme }) => {
  let messageBlock = null;
  if (message) {
    const messageStyle = {
      color: '#00c2fc',
    };
    if (level === 3) {
      messageStyle.color = '#f66';
    }

    messageBlock = <span style={messageStyle}><CircularProgress size={25} /> {message}</span>;
  }

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

  if (needSetup) {
    document.body.style.backgroundColor = theme.palette.canvasColor;
    return (
      <Grid id="welcome-screen">
        <Row>
          <Col xs={8} xsOffset={2}>
            <InitialSetup/>
          </Col>
        </Row>
      </Grid>
    );
  }

  document.body.style.backgroundColor = '#141417';
  return (
    <Grid id="welcome-screen" style={{maxWidth: '1150px', backgroundColor: '#141417'}}>
      <Row center="xs" middle="xs" style={{paddingTop: '6%'}}>
        <Col xs>
          <LogoIcon width="250" height="250" />
        </Col>
      </Row>
      {body}
    </Grid>
  );
};

Render.propTypes = {
  message: PropTypes.string,
  level: PropTypes.number,
  ready: PropTypes.bool.isRequired,
  needSetup: PropTypes.bool.isRequired,
};


const Welcome = connect(
  (state, ownProps) => ({
    message: state.launcher.getIn(['message', 'text']),
    level: state.launcher.getIn(['message', 'level']),
    ready: state.launcher.getIn(['geth', 'status']) === 'ready' && state.launcher.getIn(['connector', 'status']) === 'ready',
    needSetup: state.launcher.get('terms') !== 'v1' || state.launcher.getIn(['geth', 'type']) === 'none' || state.launcher.get('settingsUpdated') === true,
  }),
  (dispatch, ownProps) => ({
  })
)(muiThemeable()(Render));

export default Welcome;

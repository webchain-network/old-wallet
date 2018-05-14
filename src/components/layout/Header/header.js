import React from 'react';
import { AppBar, FlatButton, LinearProgress } from 'material-ui';
import { Block as BlockIcon, Settings as SettingsIcon } from 'emerald-js-ui/lib/icons3';
import SyncWarning from '../../../containers/SyncWarning';
import Status from './Status';
import Total from './Total';
import { separateThousands } from '../../../lib/convert';
import logoText from '../../../logoText.png';

const styles = {
  appBarRight: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'inherit',
  },
  buttons: {
    label: {
      textTransform: 'none',
      fontWeight: 'normal',
      fontSize: '16px',
    },
  },
};

const Header = (props) => {
  const { openSettings, muiTheme, network, showProgress, progress, tip } = props;

  const showProgressBar = (show) => {
    if (!show) {
      return null;
    }
    return (
      <div style={{padding: '0px 5px 5px 5px'}}>
        <LinearProgress
          disabled={showProgress}
          mode="determinate"
          color={muiTheme.palette.primary1Color}
          value={progress}
          style={{height: '2px'}}
        />
      </div>
    );
  };

  const EmeraldTitle = () => {
    return (
      <div>
        <img src={logoText} style={{height: '1.4rem'}}/>
      </div>
    );
  };

  const BlockDisplay = () => {
    const displayProgress = parseInt(100 - progress, 10);
    const label = showProgress ? `${separateThousands(tip - network.currentBlock.height)} blocks left (${displayProgress}%)` : `${separateThousands(network.currentBlock.height, ' ')} BLOCKS`;
    return (
      <div style={{marginTop: showProgress ? '7px' : null}}>
        <div style={{color: muiTheme.palette.alternateTextColor}}>{label}</div>
        {showProgressBar(showProgress)}
      </div>
    );
  };

  const SettingsButton = () => (
    <FlatButton
      hoverColor="transparent"
      onTouchTap={ openSettings }
      style={{color: muiTheme.palette.primary1Color}}
      label="Settings"
      labelStyle={styles.buttons.label}
      icon={<SettingsIcon style={{color: muiTheme.palette.primary1Color}}/>}
    />);

  return (
    <div>
      <AppBar
        title={<EmeraldTitle />}
        style={{backgroundColor: '#141417', borderBottom: `1px solid ${muiTheme.palette.borderColor}`}}
        showMenuIconButton={false}
        iconStyleRight={styles.appBarRight}
        zDepth={0}
        children={
          <div style={{display: 'flex', flex: '1.5 1 0%', justifyContent: 'space-between'}}>
            <div style={styles.appBarRight}>
              <Total />
              <span style={{color: '#7d7d7e', fontSize: '1.5rem', padding: '0 1rem'}}>|</span>
              <BlockDisplay />
            </div>
            <div style={styles.appBarRight}>
              <Status />
              <SettingsButton />
            </div>
          </div>
        }
      />
      <SyncWarning />
    </div>
  );
};

export default Header;

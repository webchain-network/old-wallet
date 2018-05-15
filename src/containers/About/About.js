import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import LogoIcon from '../../elements/Icons/logoIcon';
import { Button } from 'emerald-js-ui';
import version from '../../version';

const year = new Date().getFullYear();

class AboutClass extends React.Component {
  render() {
    const { muiTheme, onButtonClick, onHelpClick, onLicenseClick } = this.props;
    const styles = {
      links: {
        color: muiTheme.palette.textColor,
      },
    };
    return (
      <div style={{ padding: '30px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '25px', right: '25px' }}>
          <LogoIcon height="150px" width="150px" />
        </div>
        <h2 style={{ color: muiTheme.palette.primary1Color, fontWeight: '200', paddingBottom: '0px', marginBottom: '5px' }}>Webchain Wallet</h2>
        <div style={{ marginBottom: '20px' }}>{version}</div>
        {/* <div style={{ color: muiTheme.palette.secondaryTextColor, fontWeight: '100', lineHeight: '26px', maxWidth: '580px' }}>ETCDEVTEAM: Igor Artamonov, Isaac Ardis, Constantine Kryvomaz, Yury Gagarin, Tomasz Zdybal, Shane Jonas, Richard Schumann, Darcy Reno</div> */}
        <div style={{ paddingTop: '60px', marginBottom: '60px' }}>
          <a href="https://webchain.network/">
            <Button primary label="Visit project page" />
          </a>
        </div>
        <div style={{ fontSize: '14px' }}>
          <div style={{ paddingBottom: '5px' }}>Copyright &copy; {year} Webchain Network</div>
          <div> Licensed under <a onClick={onLicenseClick} style={styles.links} href="#">Apache License 2.0</a>
            {/* <span style={{ float: 'right', textAlign: 'right' }}>
              <a onClick={onHelpClick} style={styles.links} href="#">Help & Support</a>
            </span> */}
          </div>
        </div>
      </div>
    );
  }
}

const About = muiThemeable()(AboutClass);

export default About;


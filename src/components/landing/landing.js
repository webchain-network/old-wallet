import React from 'react';
import Divider from 'material-ui/Divider';
import Grid from '@material-ui/core/Grid';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Button from '../../elements/Button';

const Landing = ({
  onGenerate, onImportJson, onImportPrivateKey, onLedger, muiTheme,
}) => {
  const styles = {
    addAccount: {
      color: muiTheme.palette.textColor,
      fontWeight: '500',
      padding: '20px',
      fontSize: '17px',
      paddingLeft: '15px',
    },
    addAccountButtons: {
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'stretch'}}>
        <div style={{flexGrow: 1}}>
          <Grid container style={{padding: 0, margin: 0}}>
            <Grid item style={{backgroundColor: muiTheme.palette.canvasColor, padding: 0}} xs={12}>
              <div style={{
                display: 'flex', alignItems: 'center', marginLeft: '80px', marginTop: '60px',
              }}>
                <div style={{fontWeight: '500', marginLeft: '80px', color: muiTheme.palette.primary1Color}}>WELCOME TO WEBCHAIN WALLET</div>
              </div>
              <br />
              <div style={{marginLeft: '150px', padding: '10px', maxWidth: '700px'}}>
                <span style={{color: muiTheme.palette.primary3Color, fontWeight: '200'}}>
      Webchain Wallet runs on the webchain network, which is a decentralized platform based on Ethereum Classic. Webchain is a ERC20 & ERC223 Smart Contracts and DApps enabled blockchain, secured by Websites and Internet of Things.
                </span>
                <br />
                <br />
                <Button href="https://webchain.network/" target="_blank" rel="noreferrer noopener" label="More about Webchain" />
                <br />
                <br />
                <Button primary onClick={onGenerate} label="Generate New Account" />
                <br />
                <br />
              </div>
              <Divider />
              <div style={{marginLeft: '145px', marginBottom: '70px'}}>
                <div style={styles.addAccount}>Add Account</div>
                <div style={styles.addAccountButtons}>
                  <Button variant="text" primary onClick={onImportJson} label="From Keystore File (UTC/JSON)" />
                  <Button variant="text" primary onClick={onImportPrivateKey} label="From Private key" />
                  <Button variant="text" primary onClick={onLedger} label="Ledger Nano S" />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default muiThemeable()(Landing);

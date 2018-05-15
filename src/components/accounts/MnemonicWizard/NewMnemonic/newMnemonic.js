import React from 'react';
import PropTypes from 'prop-types';
import { Button, Warning, WarningHeader, WarningText, Input } from 'emerald-js-ui';
import DashboardButton from 'components/common/DashboardButton';
import { Form, Row, styles as formStyles } from 'elements/Form';

export class NewMnemonic extends React.Component {
  static propTypes = {
    onBack: PropTypes.func,
    mnemonic: PropTypes.string,
    onGenerate: PropTypes.func,
    onContinue: PropTypes.func,
  }

  render() {
    const { onBack, mnemonic, onGenerate, onContinue } = this.props;
    return (
      <Form caption="New Mnemonic account" backButton={ <DashboardButton onClick={ onBack }/> }>
        <Row>
          <div style={formStyles.left}/>
          <div style={formStyles.right}>
            <div style={{color: '#CF3B3B', fontSize: '14px'}}>
              <div style={{fontWeight: '500'}}>Keep this phrase in a safe place.</div>
              <div style={{margin: '5px 0 10px 0'}}>If you lose this phrase you will not be able to recover your account.</div>
            </div>
          </div>
        </Row>
        <Row>
          <div style={ formStyles.left }>
          </div>
          <div style={ formStyles.right }>
            <div style={{width: '100%'}}>
              <div>Mnemonic phrase</div>
              <div style={{backgroundColor: '#fff'}}>
                <Input
                  disabled={ true }
                  value={ mnemonic }
                  multiLine={ true }
                  rowsMax={ 4 }
                  rows={ 2 }
                  name="mnemonic"
                  fullWidth={ true }
                  underlineShow={ false }
                />
              </div>
            </div>
          </div>
        </Row>

        <Row>
          <div style={formStyles.left}/>
          <div style={formStyles.right}>
            { mnemonic && <Button primary label="Continue" onClick={ onContinue } /> }
            { !mnemonic && <Button primary label="Generate" onClick={ onGenerate } /> }
          </div>
        </Row>
        { this.state && this.state.error }
      </Form>
    );
  }
}

export default NewMnemonic;


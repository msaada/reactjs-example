// @flow

import Divider from 'material-ui/Divider';
import React, { Component } from 'react';
import '../../css/App.css';
import { addCallbackToFirebase } from '../../javascript/firebaseUtils';
import Footer from '../common/Footer';
import Header from '../common/Header';
import AlertDialogSuccessCallbackRequest from './AlertDialogSuccessCallbackRequest';
import { CallbackForm } from './CallbackForm';

import type { CallbackType } from '../../types/types';

type Props = {};
type State = {
  name: string,
  email: string,
  phoneNumber: string,
  callbackRequestDialog: boolean,
};

class CallbackUser extends Component<Props, State> {
  state = {
    name: '',
    email: '',
    phoneNumber: '',
    callbackRequestDialog: false,
  };

  componentDidMount = () => {};

  change = (e: SyntheticInputEvent<>) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.target.id]: e.target.value,
      });
    }
  };

  handleDialogDismiss = () => {
    this.setState({ callbackRequestDialog: false });
  };

  handleDialogShow = () => {
    this.setState({ callbackRequestDialog: true });
  };

  styles = () => {
    return {
      root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
      },
      divider: {
        marginBottom: '2em',
      },
      centered: {
        display: 'flex',
        justifyContent: 'center',
      },
      buttons: {
        display: 'flex',
        justifyContent: 'flex-start',
      },
    };
  };
  callbackUser = async () => {
    const callback: CallbackType = {
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    await addCallbackToFirebase('/callbacks', callback);
    this.setState({
      name: '',
      email: '',
      phoneNumber: '',
      callbackRequestDialog: true,
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="body" style={this.styles().root}>
          <div style={this.styles().centered}>
            <h1>Formulaire de rappel</h1>
          </div>
          <Divider style={this.styles().divider} />

          <CallbackForm
            handleCallback={this.callbackUser}
            email={this.state.email}
            name={this.state.name}
            phoneNumber={this.state.phoneNumber}
            emailChange={this.change}
            nameChange={this.change}
            phoneNumberChange={this.change}
          />

          <AlertDialogSuccessCallbackRequest
            open={this.state.callbackRequestDialog}
            handleRequestOpen={this.handleDialogShow}
            handleRequestClose={this.handleDialogDismiss}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default CallbackUser;

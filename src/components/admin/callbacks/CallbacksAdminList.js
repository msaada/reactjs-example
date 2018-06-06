//@flow
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Panel, PanelGroup } from 'react-bootstrap';

import type { FirebaseCallbackType } from '../../../types/types';

type Props = {
  callbacks: FirebaseCallbackType[],
};
type State = {
  activeKey: string,
  status: boolean,
};

export default class CallbacksAdminList extends Component<Props, State> {
  state = {
    activeKey: '0',
    status: false,
  };

  handleSelect = (activeKey: string) => {
    this.setState({ activeKey });
  };

  render() {
    return (
      <PanelGroup
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        accordion
      >
        {this.props.callbacks.map(
          (callback: FirebaseCallbackType, pos: number) => (
            <Panel header={callback.name} eventKey={String(pos)}>
              <ListGroup>
                <ListGroupItem header={'Informations utilisateur'}>
                  {'Date de demande: ' +
                    new Date(callback.timestamp).toLocaleDateString()}
                  <br />
                  {'Nom: ' + callback.name}
                  <br />
                  {'Email: ' + callback.email}
                  <br />
                  {'Numéro de téléphone: ' + callback.phoneNumber}
                </ListGroupItem>
              </ListGroup>
            </Panel>
          )
        )}
      </PanelGroup>
    );
  }
}

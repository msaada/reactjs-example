import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Card, CardGroup } from 'react-bootstrap';

export default class CallbacksAdminList extends Component {
  state = {
    activeKey: '0',
    status: false,
  };

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  };

  render() {
    return (
      <CardGroup
        id={'callback-Card-group'}
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        accordion
      >
        {this.props.callbacks.map(
          (callback, pos) => (
            <Card
              id={callback.id}
              header={callback.name}
              eventKey={String(pos)}
              key={pos}
            >
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
            </Card>
          )
        )}
      </CardGroup>
    );
  }
}

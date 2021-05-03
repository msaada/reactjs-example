import React, { Component } from 'react';
import { CardGroup } from 'react-bootstrap';

import Order from './Order';

export class OrdersList extends Component {
  state= {
    activeKey: '0',
    status: false,
  };

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  };

  render() {
    return (
      <CardGroup
        id={'order-list-Card-group'}
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        accordion
      >
        {this.props.orders.map((order, position) => (
          <Order
            key={position}
            order={order}
            usersExtras={this.props.usersExtras}
            position={position}
          />
        ))}
      </CardGroup>
    );
  }
}

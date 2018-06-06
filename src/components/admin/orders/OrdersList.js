//@flow
import React, { Component } from 'react';
import { PanelGroup } from 'react-bootstrap';

import Order from './Order';
import type { FirebaseOrderType, UserType } from '../../../types/types';

type Props = {
  orders: FirebaseOrderType[],
  usersExtras: UserType[],
};
type State = {
  activeKey: string,
  status: boolean,
};

export class OrdersList extends Component<Props, State> {
  state: State = {
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
        {this.props.orders.map((order: FirebaseOrderType, position: number) => (
          <Order
            order={order}
            usersExtras={this.props.usersExtras}
            position={position}
          />
        ))}
      </PanelGroup>
    );
  }
}

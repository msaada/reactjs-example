//@flow
import React, { Component } from "react";

import _ from "lodash";

import type { CallbackType } from "../types/types";

import { PanelGroup, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

type PropsType = {
  callbacks: Array<CallbackType>
};

export class CallbacksList extends Component {
  state: {
    activeKey: string,
    status: boolean
  } = {
    activeKey: "0",
    status: false
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
        {_.map(this.props.callbacks, (callback: CallbackType, pos: number) => (
          <Panel header={callback.name} eventKey={String(pos)}>
            <ListGroup>
              <ListGroupItem header={"Informations utilisateur"}>
                {"Nom: " + callback.name}
                <br />
                {"Email: " + callback.email}
                <br />
                {"Numéro de téléphone: " + callback.phoneNumber}
              </ListGroupItem>
            </ListGroup>
          </Panel>
        ))}
      </PanelGroup>
    );
  }
}

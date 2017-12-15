//@flow
import React, { Component } from "react";

import _ from "lodash";

import Button from "material-ui/Button";

import type { OrderType, ArtPieceType, UserType } from "../types/types";

import { PanelGroup, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

export class OrdersList extends Component {
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
        {_.map(this.props.orders, (order: OrderType, pos: number) => (
          <Panel
            header={order.userEmail}
            footer={order.status}
            eventKey={String(pos)}
          >
            <ListGroup>
              <ListGroupItem header="Status">
                {order.status && <p>Traitée</p>}
                {!order.status && <p>Non traitée</p>}
                <Button raised> Terminer commande</Button>
              </ListGroupItem>
              <ListGroupItem header="Informations utilisateur">
                {this.props.usersExtras &&
                  order &&
                  this.props.usersExtras.filter((e: UserType) => {
                    return e.id === order.userId;
                  }).length && (
                    <div>
                      <div>
                        Nom:{" "}
                        {
                          this.props.usersExtras.filter((e: UserType) => {
                            return e.id === order.userId;
                          })[0].name
                        }
                      </div>
                      <div>
                        Téléphone:{" "}
                        {
                          this.props.usersExtras.filter(
                            (e: UserType) => e.id === order.userId
                          )[0].phoneNumber
                        }
                      </div>
                      <div>
                        Addresse:{" "}
                        {
                          this.props.usersExtras.filter(
                            (e: UserType) => e.id === order.userId
                          )[0].address
                        }
                      </div>
                      <div>
                        Code Postal:{" "}
                        {
                          this.props.usersExtras.filter(
                            (e: UserType) => e.id === order.userId
                          )[0].postalCode
                        }
                      </div>
                      <div>
                        Code client:{" "}
                        {
                          this.props.usersExtras.filter(
                            (e: UserType) => e.id === order.userId
                          )[0].clientCode
                        }
                      </div>
                    </div>
                  )}
              </ListGroupItem>
              {_.map(order.artpieces, (artpiece: ArtPieceType, pos: number) => (
                <ListGroupItem header={artpiece.name}>
                  {"REF: " + artpiece.reference}
                  <br />
                  {"PRIX: " + artpiece.sellPriceTaxIncluded}
                </ListGroupItem>
              ))}
              <ListGroupItem header="TOTAL">{order.total}</ListGroupItem>
            </ListGroup>
          </Panel>
        ))}
      </PanelGroup>
    );
  }
}

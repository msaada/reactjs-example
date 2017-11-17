//@flow
import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Admin from "./Admin";

class AdminTabs extends Component {
  state: { key: number } = { key: 0 };

  handleSelect = (key: number) => {
    this.setState({ key });
  };

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Tab 1">
          Tab 1
        </Tab>
        <Tab eventKey={2} title="Tab 2">
          {/* <Admin visible={this.state.key === 2} /> */}
        </Tab>
        <Tab eventKey={3} title="Tab 3" disabled>
          Tab 3 content
        </Tab>
      </Tabs>
    );
  }
}

export default AdminTabs;

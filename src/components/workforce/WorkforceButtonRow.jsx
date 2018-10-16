import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Icon, Menu, Dropdown, Radio, Popover } from "antd";
import FleetModalAdd from "../assets/fleetModal/FleetModalContainer";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;

class WorkforceButtonRow extends React.Component {
  state = {
    modalFleetVisible: false
  };

  setModalFleetVisible(modalFleetVisible) {
    this.setState({ modalFleetVisible });
  }

  handleOkAddFleet = () => {
    this.setState({ modalFleetVisible: false });
  };

  handleCancelAddFleet = () => {
    this.setState({ modalFleetVisible: false });
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  handleOk = () => {
    this.setState({ modalVisible: false });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const content = (
      <div>
        <p>Will be availible soon</p>
      </div>
    );
    const { fleets } = this.props;
    const text = <span>Title</span>;
    const cardList = (
      <div
        style={{
          height: "500px",
          overflowY: "scroll",
          borderColor: "#036",
          borderStyle: "solid"
        }}
      >
        <Menu selectable={false}>
          <Menu.Item style={{ cursor: "default" }}>
            Show all
            <Button
              style={{
                float: "right",
                textAlign: "center",
                padding: "0px",
                width: "39px"
              }}
              onClick={this.props.handleAllFilter}
            >
              <Icon type="plus" className="no-margin" />
            </Button>
          </Menu.Item>
          {this.props.scrollNames.map((el, ind) => (
            <Menu.Item
              key={ind}
              style={{ cursor: "default" }}
              className={
                this.props.filter.indexOf(el.name) !== -1
                  ? "selected-list-item"
                  : null
              }
            >
              {el.name} {el.project}
              <span style={{ float: "right" }}>
                <Button
                  onClick={() => this.props.handleAddFilter(el.name)}
                  style={{
                    textAlign: "center",
                    padding: "0px",
                    width: "38px",
                    marginRight: "5px"
                  }}
                >
                  <Icon type="plus" className="no-margin" />
                </Button>
                {"  "}
                <Button
                  onClick={() => this.props.handleRemoveFilter(el.name)}
                  style={{
                    textAlign: "center",
                    padding: "0px",
                    width: "38px"
                  }}
                >
                  <Icon type="minus" className="no-margin" />
                </Button>
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );

    const totalHave = fleets
      .map(el => el.assigned.reduce((sum, req) => sum + 1, 0))
      .reduce((sum = 0, el) => sum + el, 0);

    const totalDemand = fleets.reduce(
      (sum = 0, el) => sum + el.headcountRequired,
      0
    );

    return [
      <Row key="row">
        <Col
          xl={{ span: 12 }}
          lg={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
        >
          <ButtonGroup>
            <Button
              type="primary"
              onClick={() => this.setModalFleetVisible(true)}
            >
              <Icon type="plus" />
              Add new Fleet
            </Button>
            <Button>
              <Link to="/workforce/people">
                <Icon type="bars" />
                View all People
              </Link>
            </Button>
            <Button type="primary">
              <Link to="/workforce/demand">
                <Icon type="file-text" />
                Roles Report
              </Link>
            </Button>
            <Popover
              placement="bottom"
              title={text}
              content={content}
              trigger="click"
            >
              <Button type="dashed" loading={fleets.loading}>
                {totalHave + " / " + totalDemand}
                <Icon type="team" />
              </Button>
            </Popover>
          </ButtonGroup>
        </Col>
        <Col
          xl={{ span: 4 }}
          lg={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
        >
          <RadioGroup
            onChange={e => {
              this.props.handleProductline(e.target.value);
            }}
            defaultValue="WPS"
          >
            <RadioButton value="WPS">WPS</RadioButton>
            <RadioButton value="WIS">WIS</RadioButton>
            <RadioButton value="DHT">DHT</RadioButton>
          </RadioGroup>
        </Col>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 24 }}
          xs={{ span: 24 }}
          md={{ span: 24 }}
          style={{ textAlign: "right" }}
        >
          <ButtonGroup>
            <Button onClick={this.props.handleCollapseAll}>
              <Icon type="up" />
              Collapse All
            </Button>

            <Dropdown
              overlay={cardList}
              visible={this.state.fleetVisible}
              placement="bottomCenter"
            >
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ fleetVisible: !this.state.fleetVisible });
                }}
              >
                Fleets
                {this.state.fleetVisible ? (
                  <Icon type="up" />
                ) : (
                  <Icon type="down" />
                )}
              </Button>
            </Dropdown>
            <Button onClick={this.props.handleResetFilter}>
              Reset <Icon type="sync" />
            </Button>
            <Button onClick={this.props.handleExpandAll}>
              <Icon type="down" />
              Expand All
            </Button>
          </ButtonGroup>
        </Col>
      </Row>,
      <FleetModalAdd
        key="fleet"
        modalFleetVisible={this.state.modalFleetVisible}
        handleCancel={this.handleCancelAddFleet}
        handleOk={this.handleOkAddFleet}
      />
    ];
  }
}

export default WorkforceButtonRow;

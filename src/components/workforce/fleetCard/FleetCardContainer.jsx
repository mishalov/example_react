import React from "react";
import { Card, Icon, Button, Row, Col } from "antd";
import FleetCardWorkforceSingle from "./FleetCardWorkforceSingle";
import FleetCardWorkforceDouble from "./FleetCardWorkforceDouble";
import FleetModalAssignPerson from "./FleetModalAssignPerson";
import { connect } from "react-redux";
import "./fleetCard.css";
import constants from "../../../store/actionTypes";

const { WORKFORCE } = constants;

class FleetCardContainer extends React.Component {
  setModalVisible = modalVisible => {
    this.setState({ modalVisible });
  };
  handleOk = () => {
    this.setState({ modalVisible: false });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleVisibleChange = flag => {
    this.setState({ dropdownVisible: flag });
  };

  render() {
    const { name, currentProject } = this.props.fleet;
    const projectName = currentProject.name || "";
    const { fleet, people } = this.props;
    const onlyIdsOfAssigned = fleet.assigned.map((el, ind) => el.personId);
    return [
      <Card
        key="card"
        title={
          <Row className={`card-header-wrapper`} type="flex" align="middle">
            <Col
              span={18}
              style={{ cursor: "Pointer" }}
              onClick={() => {
                this.props.handleCollapseCard(name);
              }}
            >
              {`${name} ${projectName}`} <Icon type="user" className="ml-20" />
              {
                onlyIdsOfAssigned.filter(
                  (el, ind) => onlyIdsOfAssigned.indexOf(el) === ind
                ).length
                /* filter(
                  (el, ind) => el.personId && fleet.assigned.indexOf(el) == ind
                ).length */
              }
              / {fleet.headcountRequired}
            </Col>
            <Col span={6} className="align-right">
              <Button
                onClick={() => {
                  this.props.handleShowFleetEdit(fleet);
                }}
              >
                <Icon type="edit" />
                Edit
              </Button>{" "}
            </Col>
          </Row>
        }
        style={{ width: fleet.numberOfShifts === 1 ? 560 : 1000 }}
        className="bordered fleet-card-container"
        bodyStyle={{ padding: "15px" }}
      >
        {!this.props.collapsed.collapsed && (
          <div className="ag-theme-blue">
            {fleet.numberOfShifts === 1 ? (
              <FleetCardWorkforceSingle
                showModalAcception={this.props.showModalAcception}
                handleChangeWorkforceCardVisible={
                  this.props.handleChangeWorkforceCardVisible
                }
                {...this.state}
                setRequired={this.setRequired}
                setModalVisible={this.setModalVisible}
                handleVisibleChange={this.handleVisibleChange}
                roles={this.props.roles}
                fleet={fleet}
                people={people}
                makeNotRequired={this.props.makeNotRequired}
                makeRequired={this.props.makeRequired}
                postAssign={this.props.postAssign}
              />
            ) : (
              <FleetCardWorkforceDouble
                showModalAcception={this.props.showModalAcception}
                handleChangeWorkforceCardVisible={
                  this.props.handleChangeWorkforceCardVisible
                }
                {...this.state}
                setRequired={this.setRequired}
                setModalVisible={this.setModalVisible}
                handleVisibleChange={this.handleVisibleChange}
                roles={this.props.roles}
                fleet={fleet}
                people={people}
                postAssign={this.props.postAssign}
              />
            )}
          </div>
        )}
      </Card>,
      <FleetModalAssignPerson key="person" />
    ];
  }
}

const mapStateToProps = state => ({
  roles: state.fleets.metaData.data.roles || {},
  people: state.workforce.workforce.data || {}
});

const mapDispatchToProps = dispatch => ({
  makeNotRequired: data =>
    dispatch({
      type: WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.REQUEST,
      payload: { data }
    }),
  makeRequired: id =>
    dispatch({
      type: WORKFORCE.ASSIGNED.MAKE_REQUIRED.REQUEST,
      payload: { id }
    }),
  postAssign: data =>
    dispatch({ type: WORKFORCE.ASSIGNED.POST.REQUEST, payload: { data } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FleetCardContainer);

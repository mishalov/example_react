import React from "react";
import { Modal, Button, Icon } from "antd";
import WorkforceCardContent from "./WorkforceCardContent";
import { connect } from "react-redux";
import constants from "../../../store/actionTypes";

const { WORKFORCE } = constants;

class WorkforceCardContainer extends React.Component {
  render() {
    const {
      workforceCard,
      competencies,
      roles,
      makeRequired,
      assigned
    } = this.props;
    const worker = this.props.people.find(
      el => el.personId === workforceCard.id
    );
    const idToUnassign = (
      assigned.find(el => el && worker && el.personId === worker.personId) || {}
    ).assignmentId;

    if (workforceCard.visible)
      return (
        <Modal
          zIndex={90}
          title={
            <div>
              <Button.Group style={{ float: "right" }}>
                <Button
                  type="danger"
                  onClick={() => {
                    makeRequired(idToUnassign);
                    this.props.handleCloseWorkforceCard();
                  }}
                >
                  <Icon type="close" />
                  Remove from Fleet
                </Button>
                <Button
                  onClick={() => {
                    this.props.handleCloseWorkforceCard();
                    this.props.hadleShowEditWorkforce(worker.personId);
                  }}
                >
                  <Icon type="edit" />
                  Edit record
                </Button>
                <Button
                  type="danger"
                  onClick={this.props.handleCloseWorkforceCard}
                >
                  ✕
                </Button>
              </Button.Group>
            </div>
          }
          className="asset-card"
          // maskClosable={true}
          closable={false}
          width={800}
          visible={true}
          onOk={this.props.handleCloseWorkforceCard}
          onCancel={this.props.handleCloseWorkforceCard}
        >
          {workforceCard.visible ? (
            <WorkforceCardContent
              worker={worker}
              competencies={competencies}
              roles={roles}
              assigned={assigned}
              fleetName={
                (
                  this.props.fleets.data.find(
                    el =>
                      el.id ===
                      (
                        worker.fleetAssignments[0] || { fleetId: -1 }
                      ).fleetId.toString()
                  ) || {}
                ).name
              }
            />
          ) : null}
        </Modal>
      );
    else return <span />;
  }
}

const mapStateToProps = state => {
  return {
    people: state.workforce.workforce.data.data || [],
    competencies: state.workforce.competencies.data || [],
    roles: state.fleets.metaData.data.roles || [],
    assigned: state.workforce.assigned.data || [],
    fleets: state.workforce.fleets || {}
  };
};

const mapDispatchToProps = dispatch => ({
  makeRequired: id =>
    dispatch({
      type: WORKFORCE.ASSIGNED.MAKE_REQUIRED.REQUEST,
      payload: { id }
    })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkforceCardContainer);

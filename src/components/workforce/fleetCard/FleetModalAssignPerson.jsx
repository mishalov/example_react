import React from "react";
import { Modal, Checkbox, Button } from "antd";
import ViewAllPeopleContainer from "../viewAllPeople/ViewAllPeopleContainer";

class FleetModalAssignPerson extends React.Component {
  render() {
    return (
      <Modal
        title="Assign Person"
        style={{ top: 20 }}
        visible={this.props.modalVisible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={
          <span>
            <Checkbox>Shared Role</Checkbox>
            <Button onClick={this.props.handleOk} type="primary">
              Submit
            </Button>
            <Button onClick={this.props.handleCancel}>Cancel</Button>
          </span>
        }
        okText="Submit"
        width="1800px"
      >
        {" "}
        <ViewAllPeopleContainer />
      </Modal>
    );
  }
}

export default FleetModalAssignPerson;

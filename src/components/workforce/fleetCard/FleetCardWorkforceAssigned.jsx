import React from "react";
import { Button } from "antd";
import TagCircle from "../../atoms/TagCircle";

class FleetCardWorkforceAssigned extends React.Component {
  render() {
    const worker = this.props.worker || { competencyIds: [] };
    const role = this.props.role || {};
    return (
      <Button
        className="workforcebtn"
        ref={button => (this.button = button)}
        onClick={() => {
          this.props.handleChangeWorkforceCardVisible(worker.personId);
        }}
      >
        {worker.fullName}
        <TagCircle
          status={
            worker.competencyIds.indexOf(role.competencyId) === -1 ? "R" : "G"
          }
        />
      </Button>
    );
  }

  componentWillUnmount() {
    this.button.onClick = null;
  }
}

export default FleetCardWorkforceAssigned;

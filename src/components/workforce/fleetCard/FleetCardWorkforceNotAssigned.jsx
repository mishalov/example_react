import React from "react";
import { Button, Input, Dropdown, Icon, Checkbox } from "antd";
const InputGroup = Input.Group;

class FleetCardWorkforceNotAssigned extends React.Component {
  state = { loading: false, searching: "", sharedRole: false };

  componentDidUpdate(prevProps) {
    if (this.props.isRequired !== prevProps.isRequired)
      this.setState({ loading: false });
  }

  render() {
    const {
      //color,
      isRequired,
      makeNotRequired,
      data,
      id,
      people,
      postAssign,
      fleet
    } = this.props;
    const menuSelect = (
      <div style={{ background: "#ffffff" }}>
        <div className="dropdownMenu">
          <table>
            <thead />
            <tbody>
              {people.data
                .filter(el => el.fullName.indexOf(this.state.searching) !== -1)
                .map((el, ind) => (
                  <tr
                    className="dropdownSelect"
                    key={ind}
                    ref={rowDrop => (this.rowDrop = rowDrop)}
                    onClick={() => {
                      if (el.fleetAssignments.length === 0) {
                        this.setState({ loading: true });
                        postAssign({
                          crew: data.crew,
                          fleetId: data.fleetId,
                          personRoleId: data.personRoleId,
                          position: data.position,
                          shift: data.shift,
                          sharedRole: this.state.sharedRole,
                          personId: el.personId
                        });
                      } else {
                        this.props.showModalAcception(
                          el.fullName,
                          fleet.name,
                          () => {
                            this.setState({ loading: true });
                            postAssign({
                              crew: data.crew,
                              fleetId: data.fleetId,
                              personRoleId: data.personRoleId,
                              position: data.position,
                              shift: data.shift,
                              sharedRole: this.state.sharedRole,
                              personId: el.personId,
                              ForceAssign: true
                            });
                          }
                        );
                      }
                    }}
                  >
                    <th className="dropdownPeople">
                      {el.fleetAssignments ? (
                        el.fleetAssignments.length !== 0 ? (
                          <Icon type="link" />
                        ) : null
                      ) : null}
                    </th>
                    <th
                      className={`dropdownPeople ${
                        el.fleetAssignments && el.fleetAssignments.length !== 0
                          ? "red"
                          : ""
                      }`}
                    >
                      {el.fullName}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Checkbox
          className="m-5"
          key="checkbox"
          onChange={e => this.setState({ sharedRole: e.target.checked })}
        >
          Shared roles
        </Checkbox>
      </div>
    );

    return (
      <InputGroup
        compact
        //style={{ backgroundColor: !isRequired ? "#808080" : "inherit" }}
      >
        <Button
          style={{
            width: 30
            // backgroundColor: !isRequired ? "#FFF" : "#b8b8dc"
          }}
          icon={isRequired ? "pushpin" : "plus-circle"}
          loading={this.state.loading}
          onClick={
            isRequired
              ? () => {
                  makeNotRequired(data);
                  this.setState({ loading: true });
                }
              : () => {
                  this.props.makeRequired(id);
                  this.setState({ loading: true });
                }
          }
        />
        <Dropdown
          overlay={menuSelect}
          placement="bottomCenter"
          onVisibleChange={this.props.handleVisibleChange}
          visible={this.state.searching !== ""}
          disabled={!isRequired}
        >
          <Input
            style={{ width: 130 }}
            placeholder={isRequired ? "Assign person" : "Not required"}
            ref={input => (this.input = input)}
            onChange={e => {
              this.setState({ searching: e.target.value });
            }}
          />
        </Dropdown>
        <Button
          style={{ width: 30 }}
          icon="search"
          ref={button => (this.button = button)}
          onClick={() => this.props.setModalVisible(true)}
          disabled={!isRequired}
        />
      </InputGroup>
    );
  }
}

export default FleetCardWorkforceNotAssigned;

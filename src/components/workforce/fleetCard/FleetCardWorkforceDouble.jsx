import React from "react";

import { Icon } from "antd";
import FleetCardWorkforceAssigned from "./FleetCardWorkforceAssigned";
import FleetCardWorkforceNotAssigned from "./FleetCardWorkforceNotAssigned";

class FleetCardWorkforceDouble extends React.Component {
  render() {
    const { ind, fleet, roles, people } = this.props;
    const assignedPeople = fleet.assigned.map(el => {
      const thisWorker = people.data.find(man => el.personId === man.personId);
      return {
        ...el,
        ...thisWorker
      };
    });
    return (
      <table className="fleet-table" key={ind}>
        <thead>
          <tr>
            <th />
            <th className="crew shift1 head1">
              Crew 1 Shift 1 <Icon type="clock-circle-o" />
            </th>
            <th className="crew shift2 head2">
              Crew 1 Shift 2 <Icon type="clock-circle" />
            </th>
            <th className="crew shift1 head1">
              Crew 2 Shift 1 <Icon type="clock-circle-o" />
            </th>
            <th className="crew head2">
              Crew 2 Shift 2 <Icon type="clock-circle" />
            </th>
          </tr>
        </thead>
        <tbody>
          {fleet.requirements.map((el, ind) => {
            const roleToDisplay = [];
            const workersWithThisRole = assignedPeople.filter(
              man => man.personRoleId.toString() === el.personRoleId
            );
            for (let i = 0; i < el.numberPeopleRequired; i++) {
              const workerCrew1s1 = workersWithThisRole
                .filter(man => man.crew === 1)
                .find(man => man.position === i + 1 && man.shift === 1);
              const workerCrew2s1 = workersWithThisRole
                .filter(man => man.crew === 2)
                .find(man => man.position === i + 1 && man.shift === 1);
              const workerCrew1s2 = workersWithThisRole
                .filter(man => man.crew === 1)
                .find(man => man.position === i + 1 && man.shift === 2);
              const workerCrew2s2 = workersWithThisRole
                .filter(man => man.crew === 2)
                .find(man => man.position === i + 1 && man.shift === 2);
              const roleNow =
                roles.find(
                  role => role.roleId.toString() === el.personRoleId
                ) || {};

              roleToDisplay.push(
                <tr key={ind + "/" + i}>
                  <td className="position">{roleNow.roleName}</td>
                  <td
                    className="crew shift1"
                    style={{
                      backgroundColor: !workerCrew1s1 ? "#f2dede" : "auto"
                    }}
                  >
                    {workerCrew1s1 && workerCrew1s1.active ? (
                      <FleetCardWorkforceAssigned
                        handleChangeWorkforceCardVisible={
                          this.props.handleChangeWorkforceCardVisible
                        }
                        worker={{
                          fullName: workerCrew1s1.fullName,
                          personId: workerCrew1s1.personId,
                          competencyIds: workerCrew1s1.competencyIds
                        }}
                        role={roleNow}
                      />
                    ) : (
                      <FleetCardWorkforceNotAssigned
                        showModalAcception={this.props.showModalAcception}
                        {...this.props}
                        setRequired={this.props.setRequired}
                        setModalVisible={this.props.setModalVisible}
                        handleVisibleChange={this.props.handleVisibleChange}
                        isRequired={!workerCrew1s1}
                        makeNotRequired={this.props.makeNotRequired}
                        makeRequired={this.props.makeRequired}
                        people={this.props.people}
                        id={(workerCrew1s1 || { assignmentId: 0 }).assignmentId}
                        data={{
                          crew: 1,
                          fleetId: fleet.id,
                          notRequired: true,
                          personRoleId: el.personRoleId,
                          position: i + 1,
                          sharedRole: el.sharedRole,
                          shift: 1
                        }}
                        postAssign={this.props.postAssign}
                      />
                    )}
                  </td>
                  <td
                    className="crew shift2"
                    style={{
                      backgroundColor: !workerCrew1s2 ? "#f2dede" : "auto"
                    }}
                  >
                    {workerCrew1s2 && workerCrew1s2.active ? (
                      <FleetCardWorkforceAssigned
                        handleChangeWorkforceCardVisible={
                          this.props.handleChangeWorkforceCardVisible
                        }
                        worker={{
                          fullName: workerCrew1s2.fullName,
                          personId: workerCrew1s2.personId,
                          competencyIds: workerCrew1s2.competencyIds
                        }}
                        role={roleNow}
                      />
                    ) : (
                      <FleetCardWorkforceNotAssigned
                        showModalAcception={this.props.showModalAcception}
                        {...this.props}
                        setRequired={this.props.setRequired}
                        setModalVisible={this.props.setModalVisible}
                        handleVisibleChange={this.props.handleVisibleChange}
                        isRequired={!workerCrew1s2}
                        makeNotRequired={this.props.makeNotRequired}
                        makeRequired={this.props.makeRequired}
                        people={this.props.people}
                        id={(workerCrew1s2 || { assignmentId: 0 }).assignmentId}
                        data={{
                          crew: 1,
                          fleetId: fleet.id,
                          notRequired: true,
                          personRoleId: el.personRoleId,
                          position: i + 1,
                          sharedRole: el.sharedRole,
                          shift: 2
                        }}
                        postAssign={this.props.postAssign}
                      />
                    )}
                  </td>
                  <td
                    className="crew shift1"
                    style={{
                      backgroundColor: !workerCrew2s1 ? "#f2dede" : "auto"
                    }}
                  >
                    {workerCrew2s1 && workerCrew2s1.active ? (
                      <FleetCardWorkforceAssigned
                        handleChangeWorkforceCardVisible={
                          this.props.handleChangeWorkforceCardVisible
                        }
                        worker={{
                          fullName: workerCrew2s1.fullName,
                          personId: workerCrew2s1.personId,
                          competencyIds: workerCrew2s1.competencyIds
                        }}
                        role={roleNow}
                      />
                    ) : (
                      <FleetCardWorkforceNotAssigned
                        showModalAcception={this.props.showModalAcception}
                        {...this.props}
                        setRequired={this.props.setRequired}
                        setModalVisible={this.props.setModalVisible}
                        handleVisibleChange={this.props.handleVisibleChange}
                        isRequired={!workerCrew2s1}
                        makeNotRequired={this.props.makeNotRequired}
                        makeRequired={this.props.makeRequired}
                        people={this.props.people}
                        id={(workerCrew2s1 || { assignmentId: 0 }).assignmentId}
                        data={{
                          crew: 2,
                          fleetId: fleet.id,
                          notRequired: true,
                          personRoleId: el.personRoleId,
                          position: i + 1,
                          sharedRole: el.sharedRole,
                          shift: 1
                        }}
                        postAssign={this.props.postAssign}
                      />
                    )}
                  </td>
                  <td
                    className="crew"
                    style={{
                      backgroundColor: !workerCrew2s2 ? "#f2dede" : "auto"
                    }}
                  >
                    {workerCrew2s2 && workerCrew2s2.active ? (
                      <FleetCardWorkforceAssigned
                        handleChangeWorkforceCardVisible={
                          this.props.handleChangeWorkforceCardVisible
                        }
                        worker={{
                          fullName: workerCrew2s2.fullName,
                          personId: workerCrew2s2.personId,
                          competencyIds: workerCrew2s2.competencyIds
                        }}
                        role={roleNow}
                      />
                    ) : (
                      <FleetCardWorkforceNotAssigned
                        showModalAcception={this.props.showModalAcception}
                        {...this.props}
                        setRequired={this.props.setRequired}
                        setModalVisible={this.props.setModalVisible}
                        handleVisibleChange={this.props.handleVisibleChange}
                        isRequired={!workerCrew2s2}
                        makeNotRequired={this.props.makeNotRequired}
                        makeRequired={this.props.makeRequired}
                        people={this.props.people}
                        id={(workerCrew2s2 || { assignmentId: 0 }).assignmentId}
                        data={{
                          crew: 2,
                          fleetId: fleet.id,
                          notRequired: true,
                          personRoleId: el.personRoleId,
                          position: i + 1,
                          sharedRole: el.sharedRole,
                          shift: 2
                        }}
                        postAssign={this.props.postAssign}
                      />
                    )}
                  </td>
                </tr>
              );
            }
            return roleToDisplay;
          })}
        </tbody>
      </table>
    );
  }
}

export default FleetCardWorkforceDouble;

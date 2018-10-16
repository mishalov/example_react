import React from "react";
import FleetCardWorkforceAssigned from "./FleetCardWorkforceAssigned";
import FleetCardWorkforceNotAssigned from "./FleetCardWorkforceNotAssigned";

class FleetCardWorkforceSingle extends React.Component {
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
            <th className="crew  head1">Crew 1</th>
            <th className="crew  head1">Crew 2</th>
          </tr>
        </thead>
        <tbody>
          {fleet.requirements.map((el, ind) => {
            const roleToDisplay = [];
            const workersWithThisRole = assignedPeople.filter(
              man => man.personRoleId.toString() === el.personRoleId
            );
            for (let i = 0; i < el.numberPeopleRequired; i++) {
              const workerCrew1 = workersWithThisRole
                .filter(man => man.crew === 1)
                .find(man => man.position === i + 1);
              const workerCrew2 = workersWithThisRole
                .filter(man => man.crew === 2)
                .find(man => man.position === i + 1);
              const roleNow =
                roles.find(
                  role => role.roleId.toString() === el.personRoleId
                ) || {};
              roleToDisplay.push(
                <tr key={ind + "/" + i}>
                  <td className="position">{roleNow.roleName}</td>
                  <td
                    className="crew"
                    style={{
                      backgroundColor: !workerCrew1 ? "#f2dede" : "auto"
                    }}
                  >
                    {workerCrew1 && workerCrew1.active ? (
                      <FleetCardWorkforceAssigned
                        handleChangeWorkforceCardVisible={
                          this.props.handleChangeWorkforceCardVisible
                        }
                        worker={{
                          fullName: workerCrew1.fullName,
                          personId: workerCrew1.personId,
                          competencyIds: workerCrew1.competencyIds
                        }}
                        role={roleNow}
                      />
                    ) : (
                      <FleetCardWorkforceNotAssigned
                        {...this.props}
                        setRequired={this.props.setRequired}
                        showModalAcception={this.props.showModalAcception}
                        setModalVisible={this.props.setModalVisible}
                        handleVisibleChange={this.props.handleVisibleChange}
                        isRequired={!workerCrew1}
                        makeNotRequired={this.props.makeNotRequired}
                        makeRequired={this.props.makeRequired}
                        people={this.props.people}
                        id={(workerCrew1 || { assignmentId: 0 }).assignmentId}
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
                    className="crew "
                    style={{
                      backgroundColor: !workerCrew2 ? "#f2dede" : "auto"
                    }}
                  >
                    {workerCrew2 && workerCrew2.active ? (
                      <FleetCardWorkforceAssigned
                        handleChangeWorkforceCardVisible={
                          this.props.handleChangeWorkforceCardVisible
                        }
                        worker={{
                          fullName: workerCrew2.fullName,
                          personId: workerCrew2.personId,
                          competencyIds: workerCrew2.competencyIds
                        }}
                        role={roleNow}
                      />
                    ) : (
                      <FleetCardWorkforceNotAssigned
                        {...this.props}
                        showModalAcception={this.props.showModalAcception}
                        setRequired={this.props.setRequired}
                        setModalVisible={this.props.setModalVisible}
                        handleVisibleChange={this.props.handleVisibleChange}
                        isRequired={!workerCrew2}
                        makeNotRequired={this.props.makeNotRequired}
                        makeRequired={this.props.makeRequired}
                        id={(workerCrew2 || { assignmentId: 0 }).assignmentId}
                        people={this.props.people}
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

export default FleetCardWorkforceSingle;

import React from "react";
import { Card } from "antd";

class WorkforceSubcardPasses extends React.Component {
  render() {
    const { worker, competencies, role } = this.props;

    const realCompetencies = competencies.filter(
      comp => comp.competencyGroup === "Passes"
    );

    //Компетенция которая требуется Undef если не соотв. роли, объект если соотв.
    const compRequired = role
      ? worker.competencyIds.find(el => el === role.competencyId)
      : {};

    //Предупреждаем что нет компетенции?
    const noComp = compRequired
      ? false
      : competencies.find(
          comp =>
            comp.competencyId === role.competencyId &&
            comp.competencyGroup === "Passes"
        );

    const rows = worker.competencyIds
      .map(
        (el, ind) =>
          !realCompetencies.find(comp => comp.competencyId === el) ? null : (
            <tr key={ind}>
              <td>✔</td>
              <td>
                {
                  realCompetencies.find(comp => comp.competencyId === el)
                    .competencyName
                }
              </td>
            </tr>
          )
      )
      .filter(el => el);

    return (
      <Card
        title={<div className="card-header-wrapper">Passes</div>}
        className="bordered"
      >
        <table className="asset-card-table">
          <tbody>
            {noComp ? (
              <tr key={0}>
                <td>✖</td>
                <td>
                  {
                    realCompetencies.find(
                      comp => comp.competencyId === role.competencyId
                    ).competencyName
                  }
                </td>
              </tr>
            ) : null}

            {rows.length === 0 ? (
              <tr>
                <td />
                <td>None</td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </table>
      </Card>
    );
  }
}

export default WorkforceSubcardPasses;

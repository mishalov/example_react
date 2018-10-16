import React from "react";
import { Row, Col } from "antd";
import WorkfroceSubcardGeneral from "./WorkforceSubcardGeneral";
import WorkforceSubcardCompetencies from "./WorkforceSubcardCompetencies";
import WorkforceSubcardCertifications from "./WorkforceSubcardCertifications";
import WorkforceSubcardPasses from "./WorkforceSubcardPasses";
import WorkforceSubcardComment from "./WorkforceSubcardComment";
// import AssetSubcardComment from "./AssetSubcardComment";

class WorkforceCardContent extends React.Component {
  render() {
    const { worker, competencies, assigned, roles, fleetName } = this.props;

    ////ТУТ НАДО ДОЛЕОЛАЛТЬ
    const assignment = assigned.find(el => el.personId === worker.personId);

    const role = roles.find(
      el => el.roleId === ((assignment && assignment.personRoleId) || -1)
    );


    return (
      <span>
        <Row>
          <Col md={{ span: 15 }}>
            <WorkfroceSubcardGeneral worker={worker} fleetName={fleetName} />
            <br />
            <WorkforceSubcardComment
              comment={worker.comments}
              //handleComment={this.props.handleComment}
            />
          </Col>

          <Col md={{ span: 8, offset: 1 }}>
            <WorkforceSubcardCompetencies
              worker={worker}
              competencies={competencies}
              roles={roles}
              role={role}
            />
            <br />
            <WorkforceSubcardCertifications
              worker={worker}
              competencies={competencies}
              roles={roles}
              role={role}
            />
            <br />
            <WorkforceSubcardPasses
              worker={worker}
              competencies={competencies}
              roles={roles}
              role={role}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col md={24}>
            <h3>Comments</h3>
          </Col>
          <Col md={24}>
             <WorkforceSubcardComment
              comment={asset.comments}
              handleComment={this.props.handleComment}
            /> 
          </Col>
        </Row> */}
      </span>
    );
  }
}

export default WorkforceCardContent;

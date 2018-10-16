import React from "react";
import { Card } from "antd";

class WorkforceSubcardGeneral extends React.Component {
  render() {
    const { worker, fleetName } = this.props;
    return (
      <Card
        title={<div className="card-header-wrapper">General</div>}
        className="bordered"
      >
        <table className="asset-card-table">
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>{worker.fullName}</td>
            </tr>
            <tr>
              <td>LDAP Alias</td>
              <td>{worker.ldapAlias}</td>
            </tr>
            <tr>
              <td>Fleet</td>
              <td>{fleetName ? fleetName : "Not assigned"}</td>
            </tr>
            <tr>
              <td>GIN</td>
              <td>{worker.gin}</td>
            </tr>
            <tr>
              <td>Grade</td>
              <td>{worker.grade}</td>
            </tr>
            <tr>
              <td>Product Line</td>
              <td>{worker.productLine}</td>
            </tr>
            <tr>
              <td>Likes overtime</td>
              <td>{worker.likesOvertime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Links</td>
              <td>
                <a
                  target="_blank"
                  href={
                    "https://directory.slb.com/query.cgi?alias=" +
                    worker.ldapAlias
                  }
                >
                  <img src="/img/ldap-16.png" alt="img" />
                  LDAP
                </a>
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <a
                  target="_blank"
                  href={
                    "http://quest.slb.com/quest/Certifications/Rpts/MyTrainingRpt.asp?GinNo=" +
                    worker.gin
                  }
                >
                  <img src="/img/quest-16.png" alt="img" />
                  QUEST
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }
}

export default WorkforceSubcardGeneral;

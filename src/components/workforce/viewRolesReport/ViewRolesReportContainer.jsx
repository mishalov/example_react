import React from "react";
import { Card, Row, Col } from "antd";
import ViewRolesReportForm from "./ViewRolesReportForm";
import ViewRolesReportTable from "./ViewRolesReportTable";
import { connect } from "react-redux";
import constants from "../../../store/actionTypes";
import LoadingCogs from "../../atoms/LoadingCogs";
const { FLEETS, WORKFORCE } = constants;

class ViewRolesReportContainer extends React.Component {
  componentDidMount() {
    this.props.getDemand();
    this.props.getFleets();
    this.props.getRoles();
  }

  isEverythingLoaded = () => {
    return (
      this.props.demand.solved &&
      this.props.metaData.rolesSolved &&
      this.props.fleets.solved
    );
  };

  render() {
    const { metaData, fleets, demand } = this.props;
    return (
      <Row gutter={32}>
        <Col xl={{ span: 6 }} md={{ span: 10 }}>
          <Card
            title={
              <Row className={`card-header-wrapper`} type="flex" align="middle">
                <Col span={12}>Filters / Grouping</Col>
                {/* <Col span={12} className="align-right">
                  <ButtonGroup>
                    <Button>
                      <Icon type="retweet" />Refresh
                    </Button>
                    <Button type="danger" onClick={this.handleReset}>
                      <Icon type="close" />Reset
                    </Button>
                  </ButtonGroup>
                </Col> */}
              </Row>
            }
          >
            <ViewRolesReportForm />
          </Card>
        </Col>
        <Col xl={{ span: 18 }} md={{ span: 14 }}>
          {this.isEverythingLoaded() ? (
            <ViewRolesReportTable
              roles={metaData.data.roles}
              demand={demand.data.fleets}
              fleets={fleets.data}
            />
          ) : (
            <LoadingCogs />
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  metaData: state.fleets.metaData || {},
  fleets: state.fleets.fleets || {},
  demand: state.workforce.demand || {}
});

const mapDispatchToProps = dispatch => ({
  getRoles: () => dispatch({ type: FLEETS.META_DATA.ROLES.GET.REQUEST }),
  getDemand: () => dispatch({ type: WORKFORCE.DEMAND.GET.REQUEST }),
  getFleets: () => dispatch({ type: FLEETS.GET.REQUEST })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRolesReportContainer);

import React from "react";
import { Card, Button, Icon, Row, Col } from "antd";
import PersonModalAdd from "./PersonModalAdd";
import ViewAllPeopleForm from "./ViewAllPeopleForm";
import ViewAllPeopleTable from "./ViewAllPeopleTable";
import { connect } from "react-redux";
import constants from "../../../store/actionTypes";
import LoadingCogs from "../../atoms/LoadingCogs";

const ButtonGroup = Button.Group;
const { WORKFORCE, FLEETS } = constants;
class ViewAllPeopleContainer extends React.Component {
  state = {
    modalVisible: false,
    TPeopleBtn: "danger",
    terminated: true,
    //TPEopleBtnName: "Terminated people",
    isEdit: false,
    filter: {
      productLine: [],
      fullName: "",
      gin: "",
      fleet: [],
      competencies: [],
      certifications: [],
      passes: []
    },
    id: null
  };

  isEverythingLoaded = () => {
    if (!this.props.workforce.solved) return false;
    if (!this.props.competencies.solved) return false;
    if (!this.props.fleets.solved) return false;
    if (!this.props.projects) return false;
    return true;
  };

  handleChangeProductLine = pl => {
    this.setState({ filter: { ...this.state.filter, productLine: pl } });
  };

  handleChangeFullName = fullName => {
    this.setState({ filter: { ...this.state.filter, fullName } });
  };

  handleChangeGin = gin => {
    this.setState({ filter: { ...this.state.filter, gin } });
  };

  handleShowEdit = id => {
    this.setState({ id, modalVisible: true, isEdit: true });
  };

  handleChangeFleet = fleet => {
    const fleets = this.props.fleets.data;
    let fleetToAdd = fleet || [];
    if (fleet.indexOf("WPS") !== -1) {
      fleetToAdd = fleet
        .filter(el => el !== "WPS")
        .concat(fleets.filter(el => el.productLine === "WPS").map(el => el.id));
    }

    if (fleet.indexOf("WIS") !== -1) {
      fleetToAdd = fleetToAdd.concat(
        fleet
          .filter(el => el !== "WIS")
          .concat(
            fleets.filter(el => el.productLine === "WIS").map(el => el.id)
          )
      );
    }

    if (fleet.indexOf("DHT") !== -1) {
      fleetToAdd = fleetToAdd.concat(
        fleet
          .filter(el => el !== "DHT")
          .concat(
            fleets.filter(el => el.productLine === "DHT").map(el => el.id)
          )
      );
    }

    if (fleet.indexOf("Not assigned") !== -1) {
      fleetToAdd.push("Not assigned");
    }
    this.setState({ filter: { ...this.state.filter, fleet: fleetToAdd } });
  };

  handleChangeCompetencies = competencies => {
    this.setState({ filter: { ...this.state.filter, competencies } });
  };

  handleChangeCertifications = certifications => {
    this.setState({ filter: { ...this.state.filter, certifications } });
  };

  handleChangePasses = passes => {
    this.setState({ filter: { ...this.state.filter, passes } });
  };

  componentDidMount() {
    if (!this.props.workforce.solved) this.props.getWorkfroce();
    if (!this.props.competencies.solved) this.props.getCompetencies();
    if (!this.props.fleets.solved) this.props.getFleets();
    if (!this.props.projects.solved) this.props.getProjects("");
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
  handleOk = () => {
    this.setState({ modalVisible: false, isEdit: false });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false, isEdit: false });
  };

  handleSwitchPeople = () => {
    const terminated = this.state.terminated;
    this.props.getWorkfroce(terminated);

    terminated
      ? this.setState({
          terminated: false
        })
      : this.setState({
          terminated: true
        });
  };
  render() {
    const { workforce, competencies, fleets, projects } = this.props;
    return [
      <Row gutter={32} key="row">
        <Col xl={{ span: 6 }} md={{ span: 10 }}>
          <Card
            title={
              <Row className={`card-header-wrapper`} type="flex" align="middle">
                <Col xxl={{ span: 12 }} md={{ span: 4 }}>
                  Filters
                </Col>
                <Col
                  xxl={{ span: 12 }}
                  md={{ span: 20 }}
                  className="align-right"
                >
                  <ButtonGroup>
                    <Button>
                      <Icon type="retweet" />
                      Refresh
                    </Button>
                    <Button type="danger" onClick={this.handleReset}>
                      <Icon type="close" />
                      Reset
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            }
          >
            {this.isEverythingLoaded() ? (
              <ViewAllPeopleForm
                competencies={competencies.data}
                handleChangeCertifications={this.handleChangeCertifications}
                handleChangeCompetencies={this.handleChangeCompetencies}
                handleChangeFleet={this.handleChangeFleet}
                handleChangeProductLine={this.handleChangeProductLine}
                handleChangePasses={this.handleChangePasses}
                handleChangeGin={this.handleChangeGin}
                handleChangeFullName={this.handleChangeFullName}
                fleets={fleets.data}
                projects={projects}
              />
            ) : (
              <LoadingCogs />
            )}
          </Card>
        </Col>
        <Col xl={{ span: 18 }} md={{ span: 14 }}>
          <Row>
            <Button
              type="primary"
              style={{ float: "left" }}
              onClick={() => this.setModalVisible(true)}
            >
              <Icon type="plus" />
              Add new Person
            </Button>
            <ButtonGroup style={{ float: "right" }}>
              <Button
                type={!this.state.terminated ? "primary" : "danger"}
                onClick={this.handleSwitchPeople}
              >
                <Icon type="swap" />
                {!this.state.terminated ? "Active" : "Terminated"}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  this.props.downloadPeople({
                    Active: true,
                    FullName: this.state.filter.fullName,
                    Gin: this.state.filter.gin,
                    FleetId: this.state.filter.fleet.reduce((str, el) => {
                      return (str += el + ",");
                    }, ""),
                    CompetencyId: this.state.filter.competencies
                      .concat(this.state.filter.certifications)
                      .concat(this.state.filter.passes)
                      .reduce((str, el) => {
                        return (str += el + ",");
                      }, ""),
                    ProductLine: this.state.filter.productLine.reduce(
                      (str, el) => {
                        return (str += el + ",");
                      },
                      ""
                    )
                  });
                }}
              >
                <Icon type="download" />
                Download .xlsx
              </Button>
            </ButtonGroup>
          </Row>
          <Row>
            {this.isEverythingLoaded() ? (
              <ViewAllPeopleTable
                filter={this.state.filter}
                workforce={workforce.data.data}
                competencies={competencies.data}
                fleets={fleets.data}
                projects={projects.data}
                handleShowEdit={this.handleShowEdit}
              />
            ) : (
              <LoadingCogs />
            )}
          </Row>
        </Col>
      </Row>,
      <PersonModalAdd
        key="person"
        competencies={competencies.data}
        projects={projects.data}
        modalVisible={this.state.modalVisible}
        handleCancel={this.handleCancel}
        handleOk={this.handleOk}
        id={this.state.id}
        isEdit={this.state.isEdit}
      />
    ];
  }
}

const mapStateToProps = state => ({
  workforce: state.workforce.workforce || {},
  competencies: state.workforce.competencies || {},
  projects: state.fleets.projects || {},
  fleets: state.fleets.fleets || {}
});

const mapDispatchToProps = dispatch => ({
  getWorkfroce: terminated =>
    dispatch({ type: WORKFORCE.GET.REQUEST, payload: { terminated } }),
  getCompetencies: () => dispatch({ type: WORKFORCE.COMPETENCIES.GET.REQUEST }),
  getFleets: () => dispatch({ type: FLEETS.GET.REQUEST }),
  getProjects: data =>
    dispatch({ type: FLEETS.PROJECTS.GET.REQUEST, payload: { data } }),
  downloadPeople: filter =>
    dispatch({ type: WORKFORCE.DOWNLOAD.REQUEST, payload: { filter } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAllPeopleContainer);

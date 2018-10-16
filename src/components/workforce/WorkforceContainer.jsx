import React from "react";
import { Divider, BackTop } from "antd";
import WorkforceButtonRow from "./WorkforceButtonRow";
import WorkforceFleetList from "./WorkforceFleetList";
import WorkforceCardContainer from "./workforceCard/WorkforceCardContainer";
import FleetModalContainerEdit from "../assets/fleetModal/FleetModalContainerEdit";
import WorkforceStatusBar from "./WorkforceStatusBar";
import PersonModalAdd from "./viewAllPeople/PersonModalAdd";
import { connect } from "react-redux";

import requests from "../../store/actionTypes";

const { WORKFORCE, FLEETS } = requests;
class WorkforceContainer extends React.Component {
  state = {
    productLine: "WPS",
    dashboard: { masterCollapsed: false, collapsed: [], filter: [] },
    workforceCard: { visible: false, id: null },
    editVisible: false,
    idToEdit: null,
    fleetModalEditVisible: false
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.fleets !== this.props.fleets ||
      nextProps.masterCollapsed !== this.props.masterCollapsed
    ) {
      this.setState({
        dashboard: {
          ...this.state.dashboard,
          collapsed: (nextProps.fleets.data || []).map(el => ({
            name: el.name,
            collapsed: this.state.dashboard.masterCollapsed
          }))
        }
      });
    }
  };

  componentDidUpdate() {
    localStorage.setItem("dashboard", JSON.stringify(this.state.dashboard));
  }

  componentWillMount() {
    const dashboard = JSON.parse(localStorage.getItem("dashboard"));
    if (dashboard) this.setState({ dashboard });
  }

  componentDidMount() {
    if (!this.props.workforce.solved) this.props.getWorkforce();
    if (!this.props.fleets.solved) this.props.getFleets();
    if (!this.props.competencies.solved) this.props.getCompetencies();
    if (!this.props.metaData.rolesSolved) this.props.getRoles();
  }

  handleChangeProductline = value => {
    this.setState({ productLine: value });
  };

  handleCollapseAll = () =>
    this.setState({
      dashboard: {
        ...this.state.dashboard,
        masterCollapsed: true,
        collapsed: this.props.fleets.data.map(el => ({
          name: el.name,
          collapsed: true
        }))
      }
    });

  handleExpandAll = () => {
    this.setState({
      dashboard: {
        ...this.state.dashboard,
        masterCollapsed: false,
        collapsed: this.props.fleets.data.map(el => ({
          name: el.name,
          collapsed: false
        }))
      }
    });
  };
  handleCollapseCard = name => {
    this.setState({
      dashboard: {
        ...this.state.dashboard,
        collapsed: this.state.dashboard.collapsed.map(
          el =>
            el.name === name ? { name: el.name, collapsed: !el.collapsed } : el
        )
      }
    });
  };

  handleAddFilter = val => {
    this.setState({
      dashboard: {
        ...this.state.dashboard,
        filter: this.state.dashboard.filter.concat(val)
      }
    });
  };

  handleRemoveFilter = val => {
    this.setState({
      dashboard: {
        ...this.state.dashboard,
        filter: this.state.dashboard.filter.filter(el => el !== val)
      }
    });
  };

  handleResetFilter = () => {
    this.setState({ dashboard: { ...this.state.dashboard, filter: [] } });
  };

  handleAllFilter = () => {
    this.setState({
      dashboard: {
        ...this.state.dashboard,
        filter: this.props.fleets.data.map(el => el.name)
      }
    });
  };
  handleChangeWorkforceCardVisible = id => {
    this.setState({ workforceCard: { visible: true, id } });
  };

  handleCloseWorkforceCard = () => {
    this.setState({ workforceCard: { visible: false, data: null } });
  };
  hadleShowEditWorkforce = id => {
    this.setState({ idToEdit: id, editVisible: true });
    if (!this.props.projects.solved) this.props.getProjects();
  };

  handleOk = () => {
    this.setState({ editVisible: false, idToEdit: null });
  };

  handleCancel = () => {
    this.setState({ editVisible: false, idToEdit: null });
  };

  handleCloseFleetEdit = () => {
    this.setState({ fleetModalEditVisible: false });
  };

  handleShowFleetEdit = fleet => {
    this.setState({ fleetModalEditVisible: true, fleetToEdit: fleet });
  };

  render() {
    const scrollNames = this.props.fleets.data
      .filter(el => el.productLine === this.state.productLine)
      .map((el, ind) => ({
        name: el.name,
        project: el.currentProject.name
      }));

    const fleets = this.props.fleets.data.filter(
      el =>
        this.state.dashboard.filter.indexOf(el.name) !== -1 &&
        el.productLine === this.state.productLine
    );

    return (
      <div>
        <BackTop />
        <PersonModalAdd
          key="person"
          competencies={this.props.competencies.data}
          projects={this.props.projects.data}
          modalVisible={this.state.editVisible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          id={this.state.idToEdit}
          isEdit={true}
        />
        <WorkforceCardContainer
          workforceCard={this.state.workforceCard}
          handleCloseWorkforceCard={this.handleCloseWorkforceCard}
          hadleShowEditWorkforce={this.hadleShowEditWorkforce}
        />
        <WorkforceButtonRow
          handleProductline={this.handleChangeProductline}
          handleCollapseAll={this.handleCollapseAll}
          handleExpandAll={this.handleExpandAll}
          scrollNames={scrollNames}
          handleAddFilter={this.handleAddFilter}
          handleRemoveFilter={this.handleRemoveFilter}
          handleResetFilter={this.handleResetFilter}
          handleAllFilter={this.handleAllFilter}
          filter={this.state.dashboard.filter}
          fleets={fleets}
        />
        <Divider />
        <WorkforceStatusBar
          handleChangeWorkforceCardVisible={
            this.handleChangeWorkforceCardVisible
          }
        />
        <WorkforceFleetList
          scrollNames={scrollNames}
          productLine={this.state.productLine}
          fleets={fleets}
          loading={
            this.props.fleets.loading ||
            this.props.workforce.loading ||
            this.props.metaData.loading
          }
          dashboard={this.state.dashboard}
          handleChangeWorkforceCardVisible={
            this.handleChangeWorkforceCardVisible
          }
          firstName={this.props.meData.firstName}
          handleCollapseCard={this.handleCollapseCard}
          handleShowFleetEdit={this.handleShowFleetEdit}
        />
        <FleetModalContainerEdit
          fromWorkforce={true}
          modalFleetVisible={this.state.fleetModalEditVisible}
          fleet={this.state.fleetToEdit}
          handleCloseFleetEdit={this.handleCloseFleetEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // assets: state.assets.assetsData || [],
  // fleets: state.assets.fleetsData || [],
  // loading: state.workforce.workforce.loading,
  fleets: state.workforce.fleets || {},
  workforce: state.workforce.workforce,
  meData: state.account.meData || {},
  projects: state.fleets.projects || {},
  competencies: state.workforce.competencies || {},
  metaData: state.fleets.metaData
});

const mapDispatchToProps = dispatch => ({
  getWorkforce: () => dispatch({ type: WORKFORCE.GET.REQUEST }),
  getFleets: () => dispatch({ type: WORKFORCE.FLEETS.GET.REQUEST }),
  getRoles: () => dispatch({ type: FLEETS.META_DATA.ROLES.GET.REQUEST }),
  getProjects: data =>
    dispatch({ type: FLEETS.PROJECTS.GET.REQUEST, payload: { data } }),
  getCompetencies: () => dispatch({ type: WORKFORCE.COMPETENCIES.GET.REQUEST })
  //getFleets: () => dispatch({ type: FLEETS.GET.REQUEST }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkforceContainer);

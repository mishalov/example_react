import React from "react";
import { Modal, Button } from "antd";
import PersonModalAddForm from "./PersonModalAddForm";
import PersonModalEditForm from "./PersonModalEditForm";
import LoadingCogs from "../../atoms/LoadingCogs";
import { connect } from "react-redux";
import constants from "../../../store/actionTypes";

const { WORKFORCE, NOTIFICATION } = constants;
const defaultData = {
  assignedProjectId: null,
  comments: "",
  competencyIds: [],
  fullName: "",
  gin: "",
  grade: "",
  hasDrivingRestrictions: false,
  hasHumanErrorHistory: false,
  humanErrorHistory: false,
  injuredOrMedLeave: false,
  ldapAlias: "",
  likesOvertime: false,
  personId: null,
  productLine: "WPS",
  retiredOrTransferedSoon: false
};

class PersonModalAdd extends React.Component {
  state = {
    data: defaultData,
    fromStoreToStateMapDone: false
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.isEdit &&
      this.props.modalVisible !== prevProps.modalVisible &&
      this.props.id
    )
      this.props.getSingleWorkforce(this.props.id);
    if (this.props.single.solved && !prevProps.single.solved) {
      this.setState({
        data: { ...this.props.single.data }
      });
    }
  }

  render() {
    const { single } = this.props;
    const title = single.solved ? (
      <div className="card-header-wrapper">
        {this.props.isEdit ? (
          single.data.active ? (
            <span>
              Edit person
              <Button
                type="danger"
                style={{ float: "right" }}
                onClick={() => {
                  single.data.active
                    ? this.props.terminatePerson(single.data.personId)
                    : this.props.activatePerson(single.data.personId);
                  this.props.handleCancel();
                }}
              >
                Terminate
              </Button>
            </span>
          ) : (
            <span>
              {" "}
              Edit person
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => {
                  this.props.activatePerson(single.data.personId);
                  this.props.handleCancel();
                }}
              >
                Activate
              </Button>
            </span>
          )
        ) : (
          "Add new Person"
        )}
      </div>
    ) : (
      "Loading..."
    );
    
    return (
      <Modal
        closable={false}
        zIndex={100}
        title={title}
        style={{ top: 20 }}
        visible={this.props.modalVisible}
        onOk={() => {
          this.setState({ data: defaultData });
          this.handleSendData();
          this.props.handleOk();
        }}
        onCancel={() => {
          this.setState({ data: defaultData });
          this.props.handleCancel();
        }}
        okText="Submit"
        width="600px"
      >
        {this.props.isEdit ? (
          single.solved && this.state.data.personId && this.props.projects ? (
            <PersonModalEditForm
              {...this.props}
              data={this.state.data}
              handleChangeAssignedProjectId={this.handleChangeAssignedProjectId}
              handleChangeComents={this.handleChangeComents}
              handleChangeCompetencyIds={this.handleChangeCompetencyIds}
              handleChangeGin={this.handleChangeGin}
              handleChangeGrade={this.handleChangeGrade}
              handleChangeHasDrivingRestrictions={
                this.handleChangeHasDrivingRestrictions
              }
              handleChangeHumanErrorHistory={this.handleChangeHumanErrorHistory}
              handleChangeInjuredOrMedLeave={this.handleChangeInjuredOrMedLeave}
              handleChangeLdap={this.handleChangeLdap}
              handleChangeLikesOvertime={this.handleChangeLikesOvertime}
              handleChangeName={this.handleChangeName}
              handleChangeProductLine={this.handleChangeProductLine}
              handleChangeRetiredOrTransferedSoon={
                this.handleChangeRetiredOrTransferedSoon
              }
            />
          ) : (
            <LoadingCogs />
          )
        ) : (
          this.props.modalVisible && (
            <PersonModalAddForm
              {...this.props}
              data={this.state.data}
              handleChangeAssignedProjectId={this.handleChangeAssignedProjectId}
              handleChangeComents={this.handleChangeComents}
              handleChangeCompetencyIds={this.handleChangeCompetencyIds}
              handleChangeGin={this.handleChangeGin}
              handleChangeGrade={this.handleChangeGrade}
              handleChangeHasDrivingRestrictions={
                this.handleChangeHasDrivingRestrictions
              }
              handleChangeHumanErrorHistory={this.handleChangeHumanErrorHistory}
              handleChangeInjuredOrMedLeave={this.handleChangeInjuredOrMedLeave}
              handleChangeLdap={this.handleChangeLdap}
              handleChangeLikesOvertime={this.handleChangeLikesOvertime}
              handleChangeName={this.handleChangeName}
              handleChangeProductLine={this.handleChangeProductLine}
              handleChangeRetiredOrTransferedSoon={
                this.handleChangeRetiredOrTransferedSoon
              }
            />
          )
        )}
      </Modal>
    );
  }

  handleSendData = () => {
    const { data } = this.state;
    if (
      !data.fullName ||
      !data.gin ||
      !data.grade ||
      !data.ldapAlias ||
      !data.productLine
    )
      this.props.makeError("Please, fill all required fields!");
    else {
      if (this.props.isEdit) this.props.putWorkforce(data);
      else this.props.postWorkforce(data);
    }
  };

  handleChangeName = value => {
    this.setState({ data: { ...this.state.data, fullName: value } });
  };

  handleChangeGin = value => {
    this.setState({ data: { ...this.state.data, gin: value } });
  };

  handleChangeGrade = value => {
    this.setState({ data: { ...this.state.data, grade: value } });
  };

  handleChangeProductLine = value => {
    this.setState({ data: { ...this.state.data, productLine: value } });
  };

  handleChangeLdap = value => {
    this.setState({ data: { ...this.state.data, ldapAlias: value } });
  };

  handleChangeComents = value => {
    this.setState({ data: { ...this.state.data, comments: value } });
  };

  handleChangeRetiredOrTransferedSoon = value => {
    this.setState({
      data: { ...this.state.data, retiredOrTransferedSoon: value }
    });
  };

  handleChangeLikesOvertime = value => {
    this.setState({ data: { ...this.state.data, likesOvertime: value } });
  };

  handleChangeInjuredOrMedLeave = value => {
    this.setState({ data: { ...this.state.data, injuredOrMedLeave: value } });
  };

  handleChangeHumanErrorHistory = value => {
    this.setState({ data: { ...this.state.data, humanErrorHistory: value } });
  };

  handleChangeHasDrivingRestrictions = value => {
    this.setState({
      data: { ...this.state.data, drivingRestrictions: value }
    });
  };

  handleChangeCompetencyIds = (cb, el) => {
    if (cb.target.checked)
      this.setState({
        data: {
          ...this.state.data,
          competencyIds: this.state.data.competencyIds.concat([el.competencyId])
        }
      });
    else
      this.setState({
        data: {
          ...this.state.data,
          competencyIds: this.state.data.competencyIds.filter(
            comp => el.competencyId !== comp
          )
        }
      });
  };

  handleChangeAssignedProjectId = value => {
    this.setState({ data: { ...this.state.data, assignedProjectId: value } });
  };
}

const mapDispatchToProps = dispatch => ({
  postWorkforce: data =>
    dispatch({ type: WORKFORCE.POST.REQUEST, payload: { data } }),
  makeError: text =>
    dispatch({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message: text
      }
    }),
  getSingleWorkforce: id =>
    dispatch({ type: WORKFORCE.SINGLE.GET.REQUEST, payload: { id } }),
  putWorkforce: data =>
    dispatch({ type: WORKFORCE.PUT.REQUEST, payload: { data } }),
  activatePerson: id =>
    dispatch({ type: WORKFORCE.ACTIVATE.REQUEST, payload: { id } }),
  terminatePerson: id =>
    dispatch({ type: WORKFORCE.TERMINATE.REQUEST, payload: { id } })
});

const mapStateToProps = state => ({
  single: state.workforce.single || {}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonModalAdd);

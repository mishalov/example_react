import React from "react";

import LoadingCogs from "../atoms/LoadingCogs";
import FleetCardContainer from "./fleetCard/FleetCardContainer";
import { Row, Col, Modal } from "antd";

const confirm = Modal.confirm;

class WorkforceFleetList extends React.Component {
  state = {
    modalAccept: {
      modalAcceptVisible: false,
      name: "",
      fromFleet: "",
      callBack: () => {}
    }
  };

  hideModalAccept = () => {
    this.setState({
      modalAccept: {
        ...this.state.modalAccept,
        modalAcceptVisible: false
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.modalAccept.modalAcceptVisible &&
      !prevState.modalAccept.modalAcceptVisible
    )
      confirm({
        title: "Do you want to reassign this person?",
        content: `Person ${
          this.state.modalAccept.name
        } will be reasigned from fleet ${
          this.state.modalAccept.fromFleet
        } to choosen fleet`,
        onOk: () => {
          this.state.modalAccept.callBack();
          this.hideModalAccept();
        },
        onCancel: () => {
          this.hideModalAccept();
        }
      });
  }

  render() {
    const { fleets, firstName } = this.props;
    return (
      <div>
        {this.props.loading === false ? (
          fleets.length === 0 ? (
            noCardsSelected(firstName)
          ) : (
            this.mapCardsToRows()
          )
        ) : (
          <LoadingCogs />
        )}
      </div>
    );
  }

  showModalAcception = (name, fromFleet, callBack) => {
    this.setState({
      modalAccept: {
        modalAcceptVisible: true,
        name,
        fromFleet,
        callBack
      }
    });
  };

  mapCardsToRows = () => {
    const {
      fleets,
      productLine,
      dashboard,
      handleChangeWorkforceCardVisible,
      handleCollapseCard
    } = this.props;
    const filtred = fleets.filter(el => el.productLine === productLine);

    const collapsed = dashboard.collapsed;
    return (
      <span>
        {filtred.map((el, ind) => (
          <FleetCardContainer
            handleShowFleetEdit={this.props.handleShowFleetEdit}
            showModalAcception={this.showModalAcception}
            fleet={el}
            key={ind}
            collapsed={collapsed.filter(colEl => colEl.name === el.name)[0]}
            handleChangeWorkforceCardVisible={handleChangeWorkforceCardVisible}
            handleCollapseCard={handleCollapseCard}
          />
        ))}
      </span>
    );
  };
}

const noCardsSelected = firstName => (
  <Row>
    <Col span={24}>
      <h2>
        Greetings, {firstName}! Data was loaded well, but you have no assigned
        fleet cards to your own dashboard.
      </h2>
      <p>
        To assign fleet cards click "Fleets" top right corner, then choose the
        fleet and click "Plus" button
      </p>
    </Col>
  </Row>
);

export default WorkforceFleetList;

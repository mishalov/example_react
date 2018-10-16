import React from "react";
import { Row, Col, Icon, Button, Tooltip, Input, Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import constants from "../../store/actionTypes";

const { WORKFORCE } = constants;
const Search = Input.Search;

class WorkforceStatusBar extends React.Component {
  state = { searchText: "" };
  render() {
    const { settings, workforce } = this.props;
    const searchMenu = (
      <Menu style={{ maxHeight: "500px", overflowY: "auto" }}>
        {workforce.solved && this.state.searchText
          ? workforce.data.data
              .filter(el => el.fullName.indexOf(this.state.searchText) !== -1)
              .map((el, ind) => (
                <Menu.Item
                  onClick={() => {
                    this.props.handleChangeWorkforceCardVisible(el.personId);
                  }}
                  key={ind}
                >
                  {el.fullName}
                </Menu.Item>
              ))
          : null}
      </Menu>
    );
    return (
      <Row align="middle" type="flex" style={{ marginBottom: "20px" }}>
        <Col span={3}>
          <Button type="primary" onClick={this.props.getFleets}>
            <Icon type="sync" title="Reload fleets" /> Refresh fleets
          </Button>
        </Col>
        <Col span={3}>
          Using cache :{" "}
          {settings.assets.isUseCache ? (
            <Tooltip title="Your data may be not actual!">
              <span className="bold">
                yes <Icon type="warning danger-color pointer" />
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Displayed data is actual!">
              <span className="ghost bold pointer">
                no <Icon type="like-o" />
              </span>
            </Tooltip>
          )}
        </Col>
        <Col span={12} />
        <Col span={6}>
          <Dropdown
            overlay={searchMenu}
            placement="bottomCenter"
            trigger={["click"]}
          >
            <Search
              style={{ textAlign: "right" }}
              placeholder="Search for worker"
              onChange={value => {
                this.setState({ searchText: value.target.value });
              }}
              enterButton
            />
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings.data || {},
  workforce: state.workforce.workforce || {}
});

const mapDispatchToProps = dispatch => ({
  getFleets: () => dispatch({ type: WORKFORCE.FLEETS.GET.REQUEST })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkforceStatusBar);

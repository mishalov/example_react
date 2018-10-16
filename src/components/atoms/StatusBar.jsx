import React from "react";
import { Row, Col, Icon, Button, Tooltip, Dropdown, Menu, Input } from "antd";
import { connect } from "react-redux";
import constants from "../../store/actionTypes";

const { ASSETS } = constants;
const ButtonGroup = Button.Group;
const Search = Input.Search;
class StatusBar extends React.Component {
  state = { searchTex: "" };

  componentDidMount() {
    this.props.getDate();
  }
  render() {
    const { settings, assets } = this.props;
    const searchMenu = (
      <Menu style={{ maxHeight: "500px", overflowY: "auto" }}>
        {assets.solved && this.state.searchText
          ? assets.data.assets
              .filter(
                el => el.serialNumber.indexOf(this.state.searchText) !== -1
              )
              .map((el, ind) => (
                <Menu.Item
                  onClick={() => {
                    this.props.handleChangeAssetCardVisible(el);
                  }}
                  key={ind}
                >
                  {el.serialNumber}
                </Menu.Item>
              ))
          : null}
      </Menu>
    );
    const menu = numCol => (
      <Menu>
        <Menu.Item
          onClick={() => {
            this.props.handleDisplayBy(numCol, "itemNumber");
          }}
        >
          <a target="_blank" rel="noopener noreferrer">
            Item number
          </a>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.props.handleDisplayBy(numCol, "serialNumber");
          }}
        >
          <a target="_blank" rel="noopener noreferrer">
            Serial number
          </a>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.props.handleDisplayBy(numCol, "manufacturerSN");
          }}
        >
          <a target="_blank" rel="noopener noreferrer">
            Manufacturer SN
          </a>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.props.handleDisplayBy(numCol, "plateNumber");
          }}
        >
          <a target="_blank" rel="noopener noreferrer">
            Plate number
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Row align="middle" type="flex">
        <Col span={5}>
          <ButtonGroup>
            <Dropdown overlay={menu(1)} placement="bottomCenter">
              <Button>1 Display by</Button>
            </Dropdown>
            <Dropdown overlay={menu(2)} placement="bottomCenter">
              <Button>2 Display by</Button>
            </Dropdown>
          </ButtonGroup>
        </Col>
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
        <Col span={5}>
          Displayed by : {this.props.displayByFirst},{" "}
          {this.props.displayBySecond}
        </Col>
        <Col span={4}>Maximo updated : {this.props.maximoUpdate.data}</Col>
        <Col span={4}>
          <Dropdown
            overlay={searchMenu}
            placement="bottomCenter"
            trigger={["click"]}
          >
            <Search
              style={{ textAlign: "right" }}
              placeholder="Search by serial number"
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
  maximoUpdate: state.assets.maximoUpdate || {}
});

const mapDispatchToProps = dispatch => ({
  getFleets: () => dispatch({ type: ASSETS.FLEETS.GET.REQUEST }),
  getDate: () => dispatch({ type: ASSETS.UPDATE_MAXIMO.DATE.REQUEST })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBar);

import { notification } from "antd";
import React from "react";
import { connect } from "react-redux";

class Notification extends React.Component {
  _mounted = true;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidUpdate() {
    if (this.props.notification && this._mounted) {
      if (this.props.notification.type) {
        notification[this.props.notification.type]({
          message: this.props.notification.title,
          description: this.props.notification.message
        });
      }
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return { notification: state.notification };
};

export default connect(mapStateToProps)(Notification);

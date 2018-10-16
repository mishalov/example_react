import "./TagCircle.css";
import React from "react";

class TagCircle extends React.Component {
  getClassName = () => {
    switch (this.props.status) {
      case "G":
        return "tag-good";
      case "Y":
        return "tag-well";
      case "R":
        return "tag-bad";
      default:
        return "tag-undefined";
    }
  };

  getToolTipText = () => {
    switch (this.props.status) {
      case "G":
        return "GOOD";
      case "Y":
        return "WELL";
      case "R":
        return "BAD";
      default:
        return "Unknown";
    }
  };

  render() {
    return (
      //<Tooltip title={this.getToolTipText()}>
      <div
        className={"tag-circle " + this.getClassName()}
        style={{ float: "right" }}
      />
      //</Tooltip>
    );
  }
}

export default TagCircle;

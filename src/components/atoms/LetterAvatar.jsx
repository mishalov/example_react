import React from "react";
import ReactLetterAvatar from "react-letter-avatar";

class LetterAvatar extends React.Component {
  render() {
    return (
      <span>
        <ReactLetterAvatar {...this.props} />
      </span>
    );
  }
}

export default LetterAvatar;

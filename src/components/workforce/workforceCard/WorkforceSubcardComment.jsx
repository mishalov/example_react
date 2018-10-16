import React from "react";
import { Input, Card } from "antd";

const { TextArea } = Input;

class WorkforceSubcardComment extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <Card
        title={<div className="card-header-wrapper">Comments</div>}
        className="bordered"
      >
        <TextArea
          rows={4}
          defaultValue={comment}
          // onChange={e => {
          //   this.props.handleComment(e.target.value);
          // }}
        />
      </Card>
    );
  }
}

export default WorkforceSubcardComment;

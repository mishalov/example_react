import React from "react";
import { Form, Button, Icon, Col, Checkbox } from "antd";
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;

const productLine = ["WPS", "WIS", "DHT"];

class ViewRolesReportForm extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const getFields = () => {
      const { getFieldDecorator } = this.props.form;
      const children = [];

      children.push(
        <Col key="col">
          <FormItem label="Product Line" className="m-5">
            {getFieldDecorator(`field1`, {})(
              <CheckboxGroup options={productLine} />
            )}
          </FormItem>
        </Col>
      );
      return children;
    };
    return (
      <Form layout="vertical" key="form">
        {getFields()}
        <ButtonGroup className="m-5" style={{ float: "left" }}>
          <Button>
            <Icon type="retweet" />
            Refresh
          </Button>
          <Button type="danger" onClick={this.handleReset}>
            <Icon type="close" />
            Reset
          </Button>
        </ButtonGroup>
      </Form>
    );
  }
}

export default Form.create()(ViewRolesReportForm);

import React from "react";
import { Form, Input, Checkbox, TreeSelect, Col, Divider } from "antd";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const productLine = ["WPS", "WIS", "DHT"];
class ViewAllPeopleForm extends React.Component {
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const competencies = this.props.competencies.filter(
      el => el.competencyGroup === "Competencies"
    );
    const certifications = this.props.competencies.filter(
      el => el.competencyGroup === "Certifications"
    );
    const passes = this.props.competencies.filter(
      el => el.competencyGroup === "Passes"
    );

    const {
      handleChangeCertifications,
      handleChangeCompetencies,
      handleChangeFleet,
      handleChangeFullName,
      handleChangeGin,
      handleChangePasses,
      handleChangeProductLine,
      fleets
    } = this.props;

    const competenciesToCheck = competencies.map(el => el.competencyName);
    const certificationsToCheck = certifications.map(el => el.competencyName);
    const passesToCheck = passes.map(el => el.competencyName);

    const treeData = [
      {
        title: "WPS",
        value: "WPS",
        key: "WPS",
        children: fleets
          .filter(el => el.productLine === "WPS")
          .map(el => ({ title: el.name, value: el.id, key: el.id }))
      },
      {
        title: "WIS",
        value: "WIS",
        key: "WIS",
        children: fleets
          .filter(el => el.productLine === "WIS")
          .map(el => ({ title: el.name, value: el.id, key: el.id }))
      },
      {
        title: "DHT",
        value: "DHT",
        key: "DHT",
        children: fleets
          .filter(el => el.productLine === "DHT")
          .map(el => ({ title: el.name, value: el.id, key: el.id }))
      },
      {
        title: "Not assigned",
        value: "Not assigned",
        key: "Not assigned"
      }
    ];
    const tProps = {
      treeData,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Select the fleet",
      allowClear: true
    };

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    const getFields = () => {
      const { getFieldDecorator } = this.props.form;
      const children = [];

      children.push(
        <Col key="col">
          <FormItem label="Product Line" className="m-5">
            {getFieldDecorator(`field1`, {})(
              <CheckboxGroup
                options={productLine}
                onChange={e => {
                  handleChangeProductLine(e);
                }}
              />
            )}
          </FormItem>
          <FormItem label="Full Name" className="m-5">
            {getFieldDecorator(`field2`, {})(
              <Input
                placeholder="Input the name"
                onChange={e => {
                  handleChangeFullName(e.target.value);
                }}
              />
            )}
          </FormItem>
          <FormItem label="GIN" className="m-5">
            {getFieldDecorator(`field3`, {})(
              <Input
                placeholder="Input the GIN"
                onChange={e => {
                  handleChangeGin(e.target.value);
                }}
              />
            )}
          </FormItem>
          <FormItem label="Fleet" className="m-5">
            {getFieldDecorator(`field4`, {})(
              <TreeSelect
                dropdownStyle={{ maxHeight: "300px", overflowY: "auto" }}
                onChange={(value, label, extra) => {
                  handleChangeFleet(value);
                  //console.log({ value, label, extra });
                }}
                {...tProps}
              />
            )}
          </FormItem>
          <FormItem label="Competencies" className="m-5" {...formItemLayout}>
            {getFieldDecorator(`field5`, {})(
              <CheckboxGroup
                options={competenciesToCheck}
                onChange={value => {
                  const arr = value.map(
                    el =>
                      competencies.find(comp => comp.competencyName === el)
                        .competencyId
                  );
                  handleChangeCompetencies(arr);
                }}
              />
            )}
          </FormItem>
          <Divider />
          <FormItem label="Certifications" className="m-5" {...formItemLayout}>
            {getFieldDecorator(`field6`, {})(
              <CheckboxGroup
                options={certificationsToCheck}
                onChange={value => {
                  const arr = value.map(
                    el =>
                      certifications.find(comp => comp.competencyName === el)
                        .competencyId
                  );
                  handleChangeCertifications(arr);
                }}
              />
            )}
          </FormItem>
          <Divider />
          <FormItem label="Passes" className="m-5" {...formItemLayout}>
            {getFieldDecorator(`field7`, {})(
              <CheckboxGroup
                options={passesToCheck}
                onChange={value => {
                  const arr = value.map(
                    el =>
                      passes.find(comp => comp.competencyName === el)
                        .competencyId
                  );
                  handleChangePasses(arr);
                }}
              />
            )}
          </FormItem>
        </Col>
      );
      return children;
    };
    return (
      <Form layout="vertical" key="form" className="filter-box">
        {getFields()}
        {/* <ButtonGroup className="m-5" style={{ float: "right" }}>
          <Button>
            <Icon type="retweet" />
            Refresh
          </Button>
          <Button type="danger" onClick={this.handleReset}>
            <Icon type="close" />
            Reset
          </Button>
        </ButtonGroup> */}
      </Form>
    );
  }
}

export default Form.create()(ViewAllPeopleForm);

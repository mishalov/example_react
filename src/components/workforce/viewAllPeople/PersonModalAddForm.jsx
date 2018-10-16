import React from "react";
import {
  Form,
  Input,
  Radio,
  Checkbox,
  Cascader,
  Select,
  InputNumber
} from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const { TextArea } = Input;
const Option = Select.Option;

const filter = (inputValue, path) => {
  return path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
};
class PersonModalAddForm extends React.Component {
  state = {
    formLayout: "vertical",
    competencyIds: []
  };

  getPageLDAP = value => {
    window.open(
      "https://directory.slb.com/query.cgi?alias=" + value,
      "_blank" // <- This is what makes it open in a new window.
    );
  };
  setProductLine = e => {
    this.setState({
      valueProductLine: e.target.value
    });
  };

  render() {
    const { formLayout } = this.state;
    const {
      handleChangeAssignedProjectId,
      handleChangeComents,
      handleChangeCompetencyIds,
      handleChangeGin,
      handleChangeGrade,
      handleChangeHasDrivingRestrictions,
      handleChangeHumanErrorHistory,
      handleChangeInjuredOrMedLeave,
      handleChangeLdap,
      handleChangeLikesOvertime,
      handleChangeName,
      handleChangeProductLine,
      handleChangeRetiredOrTransferedSoon
    } = this.props;

    const { projects } = this.props;
    const competencies = this.props.competencies.filter(
      el => el.competencyGroup === "Competencies"
    );
    const certifications = this.props.competencies.filter(
      el => el.competencyGroup === "Certifications"
    );
    const passes = this.props.competencies.filter(
      el => el.competencyGroup === "Passes"
    );

    // const competenciesToCheck = competencies.map(el => el.competencyName);
    // const certificationsToCheck = certifications.map(el => el.competencyName);
    // const passesToCheck = passes.map(el => el.competencyName);
    return (
      <Form layout={formLayout}>
        <FormItem label="Full Name" required="true" className="m-5">
          <Input
            placeholder="Input full name"
            onChange={e => {
              handleChangeName(e.target.value);
            }}
            required
          />
        </FormItem>
        <FormItem label="LDAP Alias" required="true" className="m-5">
          <Search
            placeholder="Input the LDAP"
            enterButton="LDAP"
            onSearch={value => this.getPageLDAP(value)}
            onChange={e => {
              handleChangeLdap(e.target.value);
            }}
          />
        </FormItem>
        <FormItem label="GIN" required="true" className="m-5">
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Input the GIN (ONLY NUMBERS)"
            onChange={value => {
              handleChangeGin(value);
            }}
          />
        </FormItem>
        <FormItem label="Grade" required="true" className="m-5">
          {" "}
          <Select
            placeholder="Select the Grade"
            onChange={e => {
              handleChangeGrade(e);
            }}
          >
            <Option value="G03">G03</Option>
            <Option value="G04">G04</Option>
            <Option value="G05">G05</Option>
            <Option value="G06">G06</Option>
            <Option value="G07">G07</Option>
            <Option value="G08">G08</Option>
            <Option value="G09">G09</Option>
            <Option value="G10">G10</Option>
            <Option value="G11">G11</Option>
          </Select>
        </FormItem>
        <FormItem label="Product Line" required="true" className="m-5">
          <RadioGroup
            onChange={e => {
              handleChangeProductLine(e.target.value);
            }}
            defaultValue="WPS"
          >
            <Radio value="WPS">WPS</Radio>
            <Radio value="WIS">WIS</Radio>
            <Radio value="DHT">DHT</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Assigned Project" className="m-5">
          <Cascader
            options={projects.hierarchy}
            placeholder="Select the project"
            showSearch={{ filter }}
            onChange={e => {
              handleChangeAssignedProjectId(e[4]);
            }}
          />
        </FormItem>
        <FormItem label="Risks" className="m-5">
          <table>
            <thead />
            <tbody>
              <tr>
                <td>
                  {" "}
                  <Checkbox
                    onChange={e => {
                      handleChangeInjuredOrMedLeave(e.target.checked);
                    }}
                  >
                    Injured or med leave
                  </Checkbox>
                </td>
                <td>
                  {" "}
                  <Checkbox
                    onChange={e => {
                      handleChangeRetiredOrTransferedSoon(e.target.checked);
                    }}
                  >
                    Retired or transfered soon
                  </Checkbox>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Checkbox
                    onChange={e => {
                      handleChangeHasDrivingRestrictions(e.target.checked);
                    }}
                  >
                    Driving restrictions
                  </Checkbox>
                </td>
                <td>
                  <Checkbox
                    onChange={e => {
                      handleChangeHumanErrorHistory(e.target.checked);
                    }}
                  >
                    Human error history
                  </Checkbox>
                </td>
              </tr>
            </tbody>
          </table>
        </FormItem>
        <FormItem label="Likes overtime" className="m-5">
          <Checkbox
            onChange={e => {
              handleChangeLikesOvertime(e.target.checked);
            }}
          />
        </FormItem>
        <FormItem label="Comments" className="m-5">
          <TextArea
            placeholder="Input comments"
            autosize
            onChange={e => {
              handleChangeComents(e.target.value);
            }}
          />
        </FormItem>
        <FormItem label="Competencies" className="m-5">
          <table>
            <thead>
              <tr>
                <th>Competencies</th>
                <th>Certifications</th>
                <th>Passes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top" }}>
                  {competencies.map((el, ind) => (
                    <span key={ind}>
                      <Checkbox
                        onChange={cb => {
                          handleChangeCompetencyIds(cb, el);
                        }}
                      >
                        {el.competencyName}
                      </Checkbox>
                      <br />
                    </span>
                  ))}
                </td>
                <td style={{ verticalAlign: "top" }}>
                  {certifications.map((el, ind) => (
                    <span key={ind}>
                      <Checkbox
                        onChange={cb => {
                          handleChangeCompetencyIds(cb, el);
                        }}
                      >
                        {el.competencyName}
                      </Checkbox>
                      <br />
                    </span>
                  ))}
                </td>
                <td style={{ verticalAlign: "top" }}>
                  {passes.map((el, ind) => (
                    <span key={ind}>
                      <Checkbox
                        onChange={cb => {
                          handleChangeCompetencyIds(cb, el);
                        }}
                      >
                        {el.competencyName}
                      </Checkbox>
                      <br />
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </FormItem>
      </Form>
    );
  }
}

export default PersonModalAddForm;

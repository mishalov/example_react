import React from "react";
import "./SelectSwitch.css";

class SelectSwitch extends React.Component {
  handleSwitch = event => {
    if (this.second.checked) this.props.onChange(this.props.second);
    else this.props.onChange(this.props.first);
  };

  render() {
    return (
      <div className="inlineWrapper">
        <div className="tableWrapper">
          <div className="cellWrapper" style={{ paddingRight: "20px" }}>
            {this.props.title}
          </div>
          <div className="cellWrapper">
            <div className="switch switch-blue">
              <input
                ref={el => (this.first = el)}
                type="radio"
                className="switch-input"
                name="switcher"
                value="first"
                id="first"
                defaultChecked
                onChange={this.handleSwitch}
              />
              <label htmlFor="first" className="switch-label switch-label-off">
                {this.props.first}
              </label>
              <input
                ref={el => (this.second = el)}
                type="radio"
                className="switch-input"
                name="switcher"
                value="second"
                id="second"
                onChange={this.handleSwitch}
              />
              <label htmlFor="second" className="switch-label switch-label-on">
                {this.props.second}
              </label>
              <span className="switch-selection" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectSwitch;

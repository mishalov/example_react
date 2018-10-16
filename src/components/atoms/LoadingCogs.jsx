import React from "react";
import "./LoadingCogs.css";

class LoadingCogs extends React.Component {
  render() {
    return (
      <div className="loading-block">
        <div className="container">
          <div className="gearbox">
            <div className="overlay" />
            <div className="gear one">
              <div className="gear-inner">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </div>
            <div className="gear two">
              <div className="gear-inner">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </div>
            <div className="gear three">
              <div className="gear-inner">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </div>
            <div className="gear four large">
              <div className="gear-inner">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </div>
          </div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
}

export default LoadingCogs;

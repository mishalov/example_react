import React, { Component } from "react";
import MainContainerLayout from "./components/mainContainer/MainContainerLayout";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import constants from "./store/actionTypes";
import "./style.css";
//import "ag-grid/dist/styles/ag-grid.css";
//import "ag-grid/dist/styles/ag-theme-blue.css";
const { ACCOUNT } = constants;

class App extends Component {
  componentRecie;

  componentWillMount() {
    this.props.keepLogined();
  }

  render() {
    return <div>{this.props.keeperSolved && <MainContainerLayout />}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  keepLogined: () => dispatch({ type: ACCOUNT.KEEP.REQUEST })
});

// Данное состояние указывает на то, что проверили, залогинен пользователь или нет (для того, чтобы не требовать логина при каждой перезагрузке страницы)
const mapStateToProps = state => ({
  state,
  keeperSolved: state.account.keeperSolved
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from "react";
import MainPageContainer from "./mainPage/MainPageContainer";
import { Route, Switch } from "react-router-dom";
import AssetsContainer from "./assets/AssetsContainer.jsx";
import WorkforceContainer from "./workforce/WorkforceContainer.jsx";
import ViewAllPeopleContainer from "./workforce/viewAllPeople/ViewAllPeopleContainer";
import ViewRolesReportContainer from "./workforce/viewRolesReport/ViewRolesReportContainer";
import ViewAllAssetsContainer from "./assets/viewAllAssets/ViewAllAssetsContainer";
import AdminContainer from "./admin/AdminContainer";

class AreasRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route key="0" exact path="/" component={MainPageContainer} />
        <Route key="1" exact path="/assets" component={AssetsContainer} />
        <Route key="2" exact path="/workforce" component={WorkforceContainer} />
        <Route
          key="3"
          exact
          path="/workforce/people"
          component={ViewAllPeopleContainer}
        />
        <Route
          key="4"
          exact
          path="/workforce/demand"
          component={ViewRolesReportContainer}
        />
        <Route
          key="5"
          exact
          path="/assets/list"
          component={ViewAllAssetsContainer}
        />
        <Route
          key="6"
          exact
          path="/administration"
          component={AdminContainer}
        />
      </Switch>
    );
  }
}

export default AreasRouter;

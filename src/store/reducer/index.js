import accountReducer from "./account";
import assetsReducer from "./assets";
import fleetReducer from "./fleets";
import notificationReducer from "./notification";
import workforceReducer from "./workforce";
import settingsReducer from "./settings";
import helpReducer from "./help";
import { combineReducers } from "redux";

export default combineReducers({
  assets: assetsReducer,
  fleets: fleetReducer,
  account: accountReducer,
  notification: notificationReducer,
  settings: settingsReducer,
  workforce: workforceReducer,
  help: helpReducer
});

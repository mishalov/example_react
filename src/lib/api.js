import axios from "axios";
import config from "./config";
axios.defaults.withCredentials = true;
const buildFilter = obj => {
  let str = "";
  for (var key in obj) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return "?" + str;
};

class Api {
  static request = ({ path, _method, data, headers }) => {
    const apiUrl = config.api;
    const token = window.localStorage.getItem("token");
    const method = _method || "get";

    return axios({
      method,
      url: apiUrl + path,
      data: data,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + token
      }
    });
  };

  /*
    HELP SYSTEM
    */

  static getTicketList = ldapAlias =>
    Api.request({ path: "help/list?ldapAlias=" + ldapAlias });
  static createTicket = data =>
    Api.request({ path: "help", _method: "post", data });
  static getTicketById = id => Api.request({ path: "help?ticketId=" + id });
  static createAnswer = (data, id) =>
    Api.request({ path: "help?ticketId=" + id, _method: "put", data });
  static getAllTickets = () => Api.request({ path: "help/all" });
  /*
  API Log-in  Log-out
  */

  static getAccount = () => Api.request({ path: "account" });
  static postAccount = data =>
    Api.request({
      path: "account",
      data,
      _method: "post"
    });

  /*
    API Assets
    */

  static updateAsset = data =>
    Api.request({
      path: "assets",
      _method: "put",
      data
    });

  static getAssets = filter => {
    return Api.request({
      path: "assets/list",
      data: filter,
      _method: "post"
    }); //filter
  };

  static getAssetsCodes = () => Api.request({ path: "assets/codes" });

  static getAssetsFleets = filter => Api.request({ path: "assets/fleets" });
  static getFleetRequirements = id =>
    Api.request({
      path:
        "organization-units/" +
        id +
        "?_include=asset-requirement,person-requirement"
    });
  static getAssetBases = () => Api.request({ path: "sites?type=asset-base" });
  static updateFleet = (id, data) =>
    Api.request({ path: "organization-units/" + id, data, _method: "put" });
  static getPersonRoles = () => Api.request({ path: "workforce/personroles" });
  static getAssetTypes = () => Api.request({ path: "assets/assettypes" });
  static deleteFleet = id =>
    Api.request({ path: "organization-units/" + id, _method: "delete" });
  static getProject = productLine =>
    Api.request({
      path:
        "sites" +
        buildFilter({
          type: "project",
          productLine: productLine ? productLine : ""
        })
    });
  static putComments = (id, data) =>
    Api.request({ path: `assets/${id}/comments`, _method: "put", data });

  static postAsset = data =>
    Api.request({
      path: "assets/add",
      _method: "post",
      data
    });

  static assetsDownload = filter => {
    const token = window.localStorage.getItem("token");
    return axios({
      method: "post",
      withCredentials: true,
      url: config.api + "assets/download",
      data: filter,
      headers: {
        Authorization: "Bearer " + token
      },
      responseType: "blob"
    });
  };
  static updateMaximo = data =>
    Api.request({ path: "trigger/maximosync", _method: "post", data });
  static getUpdateMaximo = () => Api.request({ path: "trigger/maximosync" });
  static changeMoveStatus = data =>
    Api.request({ path: "assets/move", _method: "post", data });
  static cancelMoveStatus = data =>
    Api.request({ path: "assets/move/cancel", _method: "post", data });
  static getSingleFleet = id => Api.request({ path: "assets/fleets/" + id });
  /*
    API Fleet
    */
  static unassignAsset = data =>
    Api.request({ path: "fleets/unassignAsset", _method: "post", data });
  static assignAsset = data =>
    Api.request({ path: "fleets/assignAsset", _method: "post", data });
  static postFleet = data =>
    Api.request({
      path: "organization-units",
      data: data.data,
      _method: "post"
    });
  static getFleets = () =>
    Api.request({ path: "organization-units?type=fleet" });
  static getFixedListUpdated = () =>
    Api.request({ path: "trigger/fixedAssets" });

  /*
    API Workforce
    */

  static getWorkforce = terminated =>
    Api.request({ path: "People?active=" + !terminated });
  static getWorkforceAssign = () =>
    Api.request({ path: "FleetPeopleAssignments" });
  static getCompetencies = () => Api.request({ path: "PersonCompetencies" });
  static getPersonRequirements = () =>
    Api.request({ path: "person-requirements" });
  static makeNotRequired = data =>
    Api.request({ path: "FleetPeopleAssignments", data, _method: "Post" });
  static postAssignWorker = data =>
    Api.request({ path: "FleetPeopleAssignments", data, _method: "Post" });
  static dissasignWorkforceFromFleet = id =>
    Api.request({ path: "FleetPeopleAssignments/" + id, _method: "delete" });
  static getCompetencies = () => Api.request({ path: "PersonCompetencies" });
  static postWorkforce = data =>
    Api.request({ path: "People", _method: "post", data });
  static putWorkforce = data =>
    Api.request({ path: "People/" + data.personId, _method: "put", data });
  static getSingleWorkforce = id => Api.request({ path: "People/" + id });
  static getRolesDemand = () =>
    Api.request({ path: "reports/workforce-demand-roles" });
  static activateWorkforce = id =>
    Api.request({ path: "People/" + id + "/activate", _method: "post" });
  static terminateWorkforce = id =>
    Api.request({ path: "People/" + id + "/terminate", _method: "post" });

  static workforceDownload = filter => {
    const token = window.localStorage.getItem("token");
    return axios({
      method: "post",
      withCredentials: true,
      url: config.api + "People/Download",
      data: filter,
      headers: {
        Authorization: "Bearer " + token
      },
      responseType: "blob"
    });
  };
}

export default Api;

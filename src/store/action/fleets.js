import constants from "../actionTypes";
import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import makeProjectsHierarchy from "../../utils/makeProjectsHierarchy";
import makeBasesHierarchy from "../../utils/makeBasesHierarchy";
import transformProjectData from "../../utils/transformProjectData";
import transformBasesData from "../../utils/transformBasesData";

const { FLEETS, NOTIFICATION, ASSETS, WORKFORCE } = constants;

function* getTypesAndRoles() {
  try {
    const responseRoles = yield call(Api.getPersonRoles);
    const responseTypes = yield call(Api.getAssetTypes);
    const payload = { roles: responseRoles.data, types: responseTypes.data };
    yield put({ type: FLEETS.META_DATA.GET.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get roles and asset types! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.META_DATA.GET.ERROR, payload: e });
  }
}

function* getFleets() {
  try {
    const response = yield call(Api.getFleets);
    yield put({ type: FLEETS.GET.SUCCESS, payload: response.data.data || [] });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get clear fleets data! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* getRoles() {
  try {
    const response = yield call(Api.getPersonRoles);
    const payload = response.data;
    yield put({ type: FLEETS.META_DATA.ROLES.GET.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message: "Can't get roles! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.META_DATA.ROLES.GET.ERROR, payload: e });
  }
}

function* getTypes() {
  try {
    const response = yield call(Api.getAssetTypes);
    const payload = response.data;
    yield put({ type: FLEETS.META_DATA.ASSETS.GET.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get assets types! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.META_DATA.GET.ERROR, payload: e });
  }
}

function* getBases() {
  try {
    const response = yield call(Api.getAssetBases);
    const hierarchy =
      makeBasesHierarchy(transformBasesData(response.data)) || [];
    yield put({ type: FLEETS.BASES.GET.SUCCESS, payload: { hierarchy } });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get assets bases! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.BASES.GET.ERROR, payload: e });
  }
}

function* assignAsset({ payload: { data } }) {
  try {
    const response = yield call(Api.assignAsset, data);
    yield put({ type: FLEETS.ASSIGN.ASSETS.SUCCESS, payload: response.data });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Assigned successful!"
      }
    });
    yield put({ type: ASSETS.FLEETS.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't assign assets to the fleet! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.ASSIGN.ASSETS.ERRORR, payload: e });
  }
}

function* unassignAsset({ payload: { data } }) {
  try {
    const response = yield call(Api.unassignAsset, data);
    yield put({ type: FLEETS.UNASSIGN.ASSETS.SUCCESS, payload: response.data });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Unassigned successful!"
      }
    });
    yield put({ type: ASSETS.FLEETS.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't unassign assets from the fleet! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.UNASSIGN.ASSETS.ERRORR, payload: e });
  }
}

function* updateFleet({ payload: { id, data, fromWorkforce } }) {
  try {
    const response = yield call(Api.updateFleet, id, data);
    yield put({ type: FLEETS.PUT.SUCCESS, payload: response });
    fromWorkforce
      ? yield put({ type: WORKFORCE.FLEETS.GET.REQUEST })
      : yield put({ type: ASSETS.FLEETS.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Unable to update this fleet! Please, message administrator about that."
      }
    });
  }
}

function* deleteFleet({ payload: { id } }) {
  try {
    const response = yield call(Api.deleteFleet, id);
    yield put({ type: FLEETS.DELETE.SUCCESS, payload: response.data });
    // yield put({ type: ASSETS.FLEETS.GET.REQUEST });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Was deleted! Please refresh fleets"
      }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Are assets or workforce assigned to this fleet? Can not remove fleet!"
      }
    });
  }
}

function* getFleetRequirements({ payload: { id } }) {
  try {
    const response = yield call(Api.getFleetRequirements, id);
    yield put({
      type: FLEETS.REQUIREMENTS.GET.SUCCESS,
      payload: response.data
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get fleet requirements! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.META_DATA.GET.ERROR, payload: e });
  }
}

function* postFleet({ payload: { data } }) {
  try {
    yield call(Api.postFleet, data);
    yield put({ type: ASSETS.FLEETS.GET.REQUEST });

    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Fleet was succesfully created!"
      }
    });
  } catch (e) {
    if (e.response && e.response.status)
      yield put({
        type: NOTIFICATION.SHOW,
        payload: {
          type: "error",
          title: "Error",
          message: "Fleet with this NUMBER is exist!"
        }
      });
    else {
      yield put({
        type: NOTIFICATION.SHOW,
        payload: {
          type: "error",
          title: "Error",
          message:
            "Can't create fleet! Please, message administrator about that."
        }
      });
    }
    yield put({ type: FLEETS.POST.ERROR, payload: e });
  }
}

function* getProjects({ payload: { productLine } }) {
  try {
    const { data } = yield call(Api.getProject, productLine);
    const dataNormalized = makeProjectsHierarchy(transformProjectData(data));
    const hierarchy = dataNormalized || [];
    const payload = {
      hierarchy,
      productLine
    };
    yield put({ type: FLEETS.PROJECTS.GET.SUCCESS, payload });
  } catch (e) {
    console.log(e);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get projects of that productline! Please, message administrator about that."
      }
    });
    yield put({ type: FLEETS.PROJECTS.GET.ERROR, payload: e });
  }
}
function* getTypesAndRolesAction() {
  yield takeLatest(FLEETS.META_DATA.GET.REQUEST, getTypesAndRoles);
}

function* getProjectsAction() {
  yield takeLatest(FLEETS.PROJECTS.GET.REQUEST, getProjects);
}

function* postFleetAction() {
  yield takeLatest(FLEETS.POST.REQUEST, postFleet);
}

function* getFleetRequirementsAction() {
  yield takeLatest(FLEETS.REQUIREMENTS.GET.REQUEST, getFleetRequirements);
}

function* updateFleetAction() {
  yield takeLatest(FLEETS.PUT.REQUEST, updateFleet);
}

function* deleteFleetAction() {
  yield takeLatest(FLEETS.DELETE.REQUEST, deleteFleet);
}

function* getTypesAction() {
  yield takeLatest(FLEETS.META_DATA.ASSETS.GET.REQUEST, getTypes);
}

function* getBasesAction() {
  yield takeLatest(FLEETS.BASES.GET.REQUEST, getBases);
}

function* assignAssetAction() {
  yield takeLatest(FLEETS.ASSIGN.ASSETS.REQUEST, assignAsset);
}

function* unassignAssetAction() {
  yield takeLatest(FLEETS.UNASSIGN.ASSETS.REQUEST, unassignAsset);
}

function* getFleetsAction() {
  yield takeLatest(FLEETS.GET.REQUEST, getFleets);
}
function* getRolesAction() {
  yield takeLatest(FLEETS.META_DATA.ROLES.GET.REQUEST, getRoles);
}
/**
 * Регистрирует сагу
 *
 * @yield {object}
 */
function* runFleetsSaga() {
  yield all([
    getTypesAndRolesAction(),
    getProjectsAction(),
    postFleetAction(),
    updateFleetAction(),
    getFleetRequirementsAction(),
    deleteFleetAction(),
    getTypesAction(),
    getBasesAction(),
    assignAssetAction(),
    unassignAssetAction(),
    getFleetsAction(),
    getRolesAction()
  ]);
}

export { runFleetsSaga };

import constants from "../actionTypes";
import FileDownload from "js-file-download";
import { call, put, takeLatest, all, select } from "redux-saga/effects";

import Api from "../../lib/api";
const { NOTIFICATION, WORKFORCE, FLEETS } = constants;

export const getFleetsState = state => state.workforce.fleets;

function* getWorkforce(payload) {
  try {
    const terminated = payload.payload && payload.payload.terminated;
    const people = yield call(Api.getWorkforce, terminated);
    yield put({ type: WORKFORCE.GET.SUCCESS, payload: people.data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "GetWorkforce error: ",
        message:
          "Can't get workforce data! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* getCompetencies() {
  try {
    const competencies = (yield call(Api.getCompetencies)).data;
    yield put({
      type: WORKFORCE.COMPETENCIES.GET.SUCCESS,
      payload: competencies
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message:
          "Can't get competencies data! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.COMPETENCIES.GET.REQUEST, payload: e });
    console.log(e);
  }
}

function* getWorkforceFleets() {
  try {
    const fleets = (yield call(Api.getFleets)).data.data;
    const requirements = (yield call(Api.getPersonRequirements)).data.data;
    const roles = (yield call(Api.getPersonRoles)).data;
    const projects = (yield call(Api.getProject)).data.data;
    const assigned = (yield call(Api.getWorkforceAssign)).data.data;

    const competencies = (yield call(Api.getCompetencies)).data;
    yield put({
      type: WORKFORCE.COMPETENCIES.GET.SUCCESS,
      payload: competencies
    });

    yield put({ type: FLEETS.META_DATA.ROLES.GET.SUCCESS, payload: roles });
    yield put({ type: WORKFORCE.ASSIGNED.GET.SUCCESS, payload: assigned });

    const fleetsWithReqs = [];
    fleets.forEach(fleet => {
      const currentProject = projects.find(
        el => el.type === "project" && el.id === fleet.projectId
      );

      const filtredReqs = requirements.filter(
        el => el.organizationUnitId === fleet.id
      );
      const filtredAssignments = assigned.filter(
        el => el.fleetId.toString() === fleet.id
      );
      const newFleet = {
        ...fleet,
        requirements: filtredReqs,
        currentProject,
        assigned: filtredAssignments
      };
      fleetsWithReqs.push(newFleet);
    });
    //console.log(JSON.stringify(fleetsWithReqs));
    //yield put({ type: WORKFORCE.ASSIGNED.GET.SUCCESS, payload: assigned.data });
    yield put({ type: WORKFORCE.FLEETS.GET.SUCCESS, payload: fleetsWithReqs });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message:
          "Can't get workforce fleets data! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.FLEETS.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* makeNotRequired({ payload: { data } }) {
  try {
    yield call(Api.makeNotRequired, data);
    const response = (yield call(Api.getWorkforceAssign, data)).data.data;
    const fleets = (yield select(getFleetsState)).data.map(el => {
      const assignments = response.filter(
        ass => ass.fleetId.toString() === el.id
      );
      return {
        ...el,
        assigned: assignments
      };
    });
    yield put({
      type: WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.SUCCESS,
      payload: fleets
    });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Changed!",
        message: "This position is not required anymore!"
      }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message:
          "Can't change this field! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.ERROR, payload: e });
    console.log(e);
  }
}

function* makeRequired({ payload: { id } }) {
  try {
    yield call(Api.dissasignWorkforceFromFleet, id);
    const response = (yield call(Api.getWorkforceAssign)).data.data;
    const people = yield call(Api.getWorkforce);
    const fleets = (yield select(getFleetsState)).data.map(el => {
      const assignments = response.filter(
        ass => ass.fleetId.toString() === el.id
      );
      return {
        ...el,
        assigned: assignments
      };
    });

    yield put({
      type: WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.SUCCESS,
      payload: fleets
    });
    yield put({ type: WORKFORCE.GET.SUCCESS, payload: people.data });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Changed!",
        message: "This position is marked as required!"
      }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message:
          "Can't change this field! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.ERROR, payload: e });
    console.log(e);
  }
}

function* assignToFleet({ payload: { data } }) {
  try {
    yield call(Api.postAssignWorker, data);
    //yield call(Api)

    const response = (yield call(Api.getWorkforceAssign)).data.data;
    yield put({
      type: WORKFORCE.ASSIGNED.GET.SUCCESS,
      payload: response
    });
    const fleets = (yield select(getFleetsState)).data.map(el => {
      const assignments = response.filter(
        ass => ass.fleetId.toString() === el.id
      );
      return {
        ...el,
        assigned: assignments
      };
    });
    yield put({
      type: WORKFORCE.ASSIGNED.POST.SUCCESS,
      payload: fleets
    });

    const people = yield call(Api.getWorkforce, false);
    yield put({ type: WORKFORCE.GET.SUCCESS, payload: people.data });

    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Assigned successful!"
      }
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message:
          "Can't assign this worker to the fleet, is he assigned to another fleet? Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.ASSIGNED.POST.ERROR, payload: e });
  }
}

function* postWorkforce({ payload: { data } }) {
  try {
    yield call(Api.postWorkforce, data);

    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Created",
        message: "Worker was created well!"
      }
    });

    yield put({ type: WORKFORCE.FLEETS.GET.REQUEST });
    yield put({ type: WORKFORCE.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message: "Can't create worker! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.ASSIGNED.POST.ERROR, payload: e });
  }
}

function* getSingleWorkforce({ payload: { id } }) {
  try {
    const { data } = yield call(Api.getSingleWorkforce, id);
    yield put({ type: WORKFORCE.SINGLE.GET.SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message: "Can't get worker! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.SINGLE.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* putWorkforce({ payload: { data } }) {
  try {
    yield call(Api.putWorkforce, data);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Updated successful!"
      }
    });
    yield put({ type: WORKFORCE.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message: "Can't update! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.SINGLE.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* getRolesDemand() {
  try {
    const { data } = yield call(Api.getRolesDemand);
    yield put({ type: WORKFORCE.DEMAND.GET.SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message:
          "Can't get role demands! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.SINGLE.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* activateWorkforce({ payload: { id } }) {
  try {
    yield call(Api.activateWorkforce, id);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Activated successful!"
      }
    });
    yield put({ type: WORKFORCE.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message: "Can't activate! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.SINGLE.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* terminateWorkforce({ payload: { id } }) {
  try {
    yield call(Api.terminateWorkforce, id);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Terminated successful!"
      }
    });
    yield put({ type: WORKFORCE.GET.REQUEST });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error!",
        message: "Can't activate! Please message administrator about that!"
      }
    });
    yield put({ type: WORKFORCE.SINGLE.GET.ERROR, payload: e });
    console.log(e);
  }
}

function* workforceDownload({ payload: { filter } }) {
  try {
    //console.log("Фильтр", filter);
    const response = yield call(Api.workforceDownload, filter);
    FileDownload(response.data, "ReportWorkforce.xlsx");
    //yield put({ type: ASSETS.DOWNLOAD.SUCCESS, payload: response.data });
    //console.log("ассетс", response);
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't start downloading! Please, message administrator about that."
      }
    });
    console.log(e);
    yield put({ type: WORKFORCE.DOWNLOAD.ERROR, payload: e });
  }
}

function* workforceDownloadAction() {
  yield takeLatest(WORKFORCE.DOWNLOAD.REQUEST, workforceDownload);
}

function* getRolesDemandAction() {
  yield takeLatest(WORKFORCE.DEMAND.GET.REQUEST, getRolesDemand);
}

function* getWorkforceAction() {
  yield takeLatest(WORKFORCE.GET.REQUEST, getWorkforce);
}

function* getWorkforceFleetsAction() {
  yield takeLatest(WORKFORCE.FLEETS.GET.REQUEST, getWorkforceFleets);
}

function* makeNotRequiredAction() {
  yield takeLatest(
    WORKFORCE.ASSIGNED.MAKE_NOT_REQUIRED.REQUEST,
    makeNotRequired
  );
}

function* makeRequiredAction() {
  yield takeLatest(WORKFORCE.ASSIGNED.MAKE_REQUIRED.REQUEST, makeRequired);
}

function* assignToFleetAction() {
  yield takeLatest(WORKFORCE.ASSIGNED.POST.REQUEST, assignToFleet);
}

function* getSingleWorkforceAction() {
  yield takeLatest(WORKFORCE.SINGLE.GET.REQUEST, getSingleWorkforce);
}

function* getCompetenciesAction() {
  yield takeLatest(WORKFORCE.COMPETENCIES.GET.REQUEST, getCompetencies);
}

function* postWorkforceAction() {
  yield takeLatest(WORKFORCE.POST.REQUEST, postWorkforce);
}

function* putWorkforceAction() {
  yield takeLatest(WORKFORCE.PUT.REQUEST, putWorkforce);
}

function* activateWorkforceAction() {
  yield takeLatest(WORKFORCE.ACTIVATE.REQUEST, activateWorkforce);
}

function* terminateWorkforceAction() {
  yield takeLatest(WORKFORCE.TERMINATE.REQUEST, terminateWorkforce);
}
/**
 * Регистрирует сагу
 *
 * @yield {object}
 */
function* runWorkfroceSaga() {
  yield all([
    getWorkforceAction(),
    getWorkforceFleetsAction(),
    makeNotRequiredAction(),
    makeRequiredAction(),
    assignToFleetAction(),
    getCompetenciesAction(),
    postWorkforceAction(),
    getSingleWorkforceAction(),
    putWorkforceAction(),
    getRolesDemandAction(),
    activateWorkforceAction(),
    terminateWorkforceAction(),
    workforceDownloadAction()
    // loginRequestAction(),
    // getMeRequestAction(),
    // logOutRequestAction(),
    // keepLogginedRequestAction()
  ]);
}

export { runWorkfroceSaga };

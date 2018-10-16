import constants from "../actionTypes";
import { call, put, takeLatest, all, select } from "redux-saga/effects";
import normalizeFleetResponse from "../../utils/normalizeFleetResponce";
import FileDownload from "js-file-download";
import Api from "../../lib/api";
const { ASSETS, NOTIFICATION } = constants;

const getStoredFleets = state => state.assets.fleetsData;

function* insertFleet(id) {
  const { data } = yield call(Api.getSingleFleet, id);
  const newFleets = (yield select(getStoredFleets)).filter(
    el => el.fleetId !== id
  );
  newFleets.push(normalizeFleetResponse(data));
  yield put({ type: ASSETS.FLEETS.GET.SUCCESS, payload: newFleets });
}

function* getFleets() {
  try {
    const settings = JSON.parse(localStorage.getItem("settings"));
    const fromCache = settings.assetsCached;
    const cached = settings.assets.isUseCache;
    if (cached && fromCache) {
      yield put({ type: ASSETS.FLEETS.GET.SUCCESS, payload: fromCache });
    } else {
      const response = yield call(Api.getAssetsFleets);
      const fleetsNormalized = response.data.map(el =>
        normalizeFleetResponse(el)
      );
      yield put({ type: ASSETS.FLEETS.GET.SUCCESS, payload: fleetsNormalized });
      localStorage.setItem(
        "settings",
        JSON.stringify({ ...settings, assetsCached: fleetsNormalized })
      );
    }
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message: "Can't get fleets! Please, message administrator about that."
      }
    });
    yield put({ type: ASSETS.FLEETS.GET.ERROR, payload: e });
  }
}

function* getAssets({ payload: { filter } }) {
  try {
    const response = yield call(Api.getAssets, filter);
    yield put({ type: ASSETS.GET.SUCCESS, payload: response.data });
    //console.log("ассетс", response);
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't get list of assets! Please, message administrator about that."
      }
    });
    yield put({ type: ASSETS.GET.ERROR, payload: e });
  }
}

function* assetsDownload({ payload: { filter } }) {
  try {
    const response = yield call(Api.assetsDownload, filter);
    FileDownload(response.data, "Report.xlsx");
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
    yield put({ type: ASSETS.DOWNLOAD.ERROR, payload: e });
  }
}

function* putComment({ payload: { id, data } }) {
  try {
    let fd = new FormData();
    fd.append("comments", data);
    const response = yield call(Api.putComments, id, fd);
    yield put({ type: ASSETS.COMMENTS.PUT.SUCCESS, payload: response });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "success",
        message: "Commented successfuly!"
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
          "Unable to post your commet! Please, message administrator about that."
      }
    });
    yield put({ type: ASSETS.COMMENTS.PUT.REQUEST, payload: e });
  }
}

function* getAssetsCodes() {
  try {
    const response = yield call(Api.getAssetsCodes);
    yield put({ type: ASSETS.CODES.GET.SUCCESS, payload: response.data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Unable to get assets codes! Please, message administrator about that."
      }
    });
    yield put({ type: ASSETS.CODES.GET.ERROR, payload: e });
  }
}

function* postAsset({ payload: { data } }) {
  try {
    yield call(Api.postAsset, data);
    yield put({ type: ASSETS.POST.SUCCESS });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Asset was created successfuly!"
      }
    });
  } catch (e) {
    if (e.response.status === 409)
      yield put({
        type: NOTIFICATION.SHOW,
        payload: {
          type: "error",
          title: "Error",
          message: "This Asset already exists!!!"
        }
      });
    else
      yield put({
        type: NOTIFICATION.SHOW,
        payload: {
          type: "error",
          title: "Error",
          message:
            "Unable to create asset! Please, message administrator about that."
        }
      });
    console.log(e.response);
    yield put({ type: ASSETS.POST.ERROR, payload: e });
  }
}

function* putAsset({ payload: { data } }) {
  try {
    yield call(Api.updateAsset, data);
    yield put({ type: ASSETS.PUT.SUCCESS });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Asset was updated successfuly!"
      }
    });
    yield put({
      type: ASSETS.GET.REQUEST,
      payload: { filter: { LiveFilter: { field: "All", value: "" } } }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Unable to update asset! Please, message administrator about that."
      }
    });
    console.log(e);
    yield put({ type: ASSETS.POST.ERROR, payload: e });
  }
}

function* getFixedListUpdated() {
  try {
    const { data } = yield call(Api.getFixedListUpdated);
    yield put({ type: ASSETS.FIXED_ASSETS.GET.SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Unable to get date of last updating of fixed asset list! Please, message administrator about that."
      }
    });
    console.log(e);
    yield put({ type: ASSETS.FIXED_ASSETS.GET.REQUEST, payload: e });
  }
}

function* updateMaximo({ payload: { data } }) {
  try {
    // Api.request(data);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Maximo data will be updated in 5-10 minutes"
      }
    });

    const formData = new FormData();
    formData.append("alias", data.alias);
    formData.append("password", data.password);

    yield call(Api.updateMaximo, formData); //data); //
    yield put({ type: ASSETS.UPDATE_MAXIMO.DATE.REQUEST });
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Maximo data updated!"
      }
    });
  } catch (e) {
    // yield put({
    //   type: NOTIFICATION.SHOW,
    //   payload: {
    //     type: "error",
    //     title: "Error",
    //     message:
    //       "Something went wrong! Please message administrator about that."
    //   }
    // });
    // console.log(e);
  }
}

function* getUpdateMaximo() {
  try {
    const { data } = yield call(Api.getUpdateMaximo);
    yield put({ type: ASSETS.UPDATE_MAXIMO.DATE.SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Cant get  last update of Maximo! Please message administrator about that."
      }
    });
    yield put({ type: ASSETS.UPDATE_MAXIMO.DATE.ERROR, payload: e });
    console.log(e);
  }
}

function* sendToShop({ payload: { data, fleetId } }) {
  try {
    yield call(Api.changeMoveStatus, data);
    yield put({ type: ASSETS.SEND.POST.SUCCESS });
    yield call(insertFleet, fleetId);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Move status changed"
      }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Cant change shop status! Please message administrator about that."
      }
    });
    yield put({ type: ASSETS.SEND.POST.ERROR, payload: e });
    console.log(e);
  }
}

function* cancelFromShop({ payload: { data, fleetId } }) {
  try {
    yield call(Api.cancelMoveStatus, data);
    yield put({ type: ASSETS.SEND.DELETE.SUCCESS });
    yield call(insertFleet, fleetId);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Move status changed"
      }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Cant change shop status! Please message administrator about that."
      }
    });
    yield put({ type: ASSETS.SEND.DELETE.ERROR, payload: e });
    console.log(e);
  }
}

function* getFleetsAction() {
  yield takeLatest(ASSETS.FLEETS.GET.REQUEST, getFleets);
}

function* cancelFromShopAction() {
  yield takeLatest(ASSETS.SEND.DELETE.REQUEST, cancelFromShop);
}

function* sendToShopAction() {
  yield takeLatest(ASSETS.SEND.POST.REQUEST, sendToShop);
}
function* getAssetsAction() {
  yield takeLatest(ASSETS.GET.REQUEST, getAssets);
}
function* putCommentAction() {
  yield takeLatest(ASSETS.COMMENTS.PUT.REQUEST, putComment);
}

function* postAssetAction() {
  yield takeLatest(ASSETS.POST.REQUEST, postAsset);
}

function* getAssetsCodesAction() {
  yield takeLatest(ASSETS.CODES.GET.REQUEST, getAssetsCodes);
}

function* putAssetsAction() {
  yield takeLatest(ASSETS.PUT.REQUEST, putAsset);
}

function* assetsDownloadAction() {
  yield takeLatest(ASSETS.DOWNLOAD.REQUEST, assetsDownload);
}

function* updateMaximoAction() {
  yield takeLatest(ASSETS.UPDATE_MAXIMO.REQUEST, updateMaximo);
}

function* getUpdateMaximoAction() {
  yield takeLatest(ASSETS.UPDATE_MAXIMO.DATE.REQUEST, getUpdateMaximo);
}

function* getFixedListUpdatedAction() {
  yield takeLatest(ASSETS.FIXED_ASSETS.GET.REQUEST, getFixedListUpdated);
}
/**
 * Регистрирует сагу
 *
 * @yield {object}
 */
function* runAssetsSaga() {
  yield all([
    getFleetsAction(),
    getAssetsAction(),
    putCommentAction(),
    postAssetAction(),
    getAssetsCodesAction(),
    putAssetsAction(),
    assetsDownloadAction(),
    updateMaximoAction(),
    getUpdateMaximoAction(),
    sendToShopAction(),
    cancelFromShopAction(),
    getFixedListUpdatedAction()
  ]);
}

export { runAssetsSaga };

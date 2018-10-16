import constants from "../actionTypes";
import { call, put, takeLatest, all } from "redux-saga/effects";

import Api from "../../lib/api";
const { ACCOUNT, NOTIFICATION } = constants;

function* signInRequest({ payload: { data } }) {
  try {
    const response = yield call(Api.postAccount, data);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", response.data.ldapAlias);
    yield put({ type: ACCOUNT.POST.SUCCESS, payload: response.data });

    yield put({ type: ACCOUNT.GET.REQUEST });

    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Welcome back!"
      }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "SignIn error: ",
        message: "Something went wrong, check your auth data"
      }
    });
    yield put({
      type: ACCOUNT.POST.ERROR,
      payload: e
    });
  }
}

function* getMeRequest() {
  try {
    const response = yield call(Api.getAccount);
    yield put({ type: ACCOUNT.GET.SUCCESS, payload: response.data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Account error: ",
        //message: e
        message: "Can't get your Account data, please, write ticket"
      }
    });
  }
}

function* logOutRequest() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "LogOut error: ",
        message:
          "Something went wrong! Your data could partly be stucked in browser"
      }
    });
  }
}

function* keepLogginedRequest() {
  try {
    const ldapAlias = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (ldapAlias && token) {
      const response = yield call(Api.getAccount);
      yield put({
        type: ACCOUNT.POST.SUCCESS,
        payload: { ldapAlias, token }
      });
      yield put({ type: ACCOUNT.GET.SUCCESS, payload: response.data });
    }
    yield put({ type: ACCOUNT.KEEP.SUCCESS });
  } catch (e) {
    yield put({ type: ACCOUNT.KEEP.SUCCESS });
  }
}

function* loginRequestAction() {
  yield takeLatest(ACCOUNT.POST.REQUEST, signInRequest);
}

function* getMeRequestAction() {
  yield takeLatest(ACCOUNT.GET.REQUEST, getMeRequest);
}

function* logOutRequestAction() {
  yield takeLatest(ACCOUNT.LOGOUT.REQUEST, logOutRequest);
}

function* keepLogginedRequestAction() {
  yield takeLatest(ACCOUNT.KEEP.REQUEST, keepLogginedRequest);
}

/**
 * Регистрирует сагу
 *
 * @yield {object}
 */
function* runAccountSaga() {
  yield all([
    loginRequestAction(),
    getMeRequestAction(),
    logOutRequestAction(),
    keepLogginedRequestAction()
  ]);
}

export { runAccountSaga };

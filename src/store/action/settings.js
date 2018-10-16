import constants from "../actionTypes";
import { put, takeLatest, all } from "redux-saga/effects";
const { SETTINGS, NOTIFICATION } = constants;

function* getSettings() {
  try {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings) {
      yield put({ type: SETTINGS.DEFAULT.REQUEST });
      return;
    }
    const settingsToStore = {
      assets: {
        isUseCache: settings.assets.isUseCache,
        lastUpdated: settings.assets.lastUpdated
      },
      workforce: {
        isUseCache: settings.workforce.isUseCache,
        lastUpdated: settings.workforce.lastUpdated
      }
    };
    yield put({ type: SETTINGS.GET.SUCCESS, payload: settingsToStore });
  } catch (e) {
    console.log(e);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Something wrong with your settings! Please, message administrator about that."
      }
    });
    yield put({ type: SETTINGS.GET.ERROR, payload: e });
  }
}

function* postSettings({ payload }) {
  try {
    const settings = payload.settings;
    localStorage.setItem("settings", JSON.stringify(settings));
    yield put({ type: SETTINGS.GET.REQUEST });
  } catch (e) {
    console.log("post error", e);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't save your settings! Please, message administrator about that."
      }
    });
    yield put({ type: SETTINGS.GET.ERROR, payload: e });
  }
}

function* settingsToDefault() {
  try {
    const newSettings = {
      assets: {
        cached: {},
        isUseCache: false,
        dashboard: {},
        lastUpdated: ""
      },
      workforce: {
        dashboard: {},
        cached: {},
        isUseCache: false,
        lastUpdated: ""
      },
      username: "unknown"
    };
    localStorage.setItem("settings", JSON.stringify(newSettings));
    yield put({ type: SETTINGS.GET.SUCCESS, payload: newSettings });
  } catch (e) {
    console.log("def error", e);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message:
          "Can't return settings to default! Please, message administrator about that."
      }
    });
    yield put({ type: SETTINGS.GET.ERROR, payload: e });
  }
}

function* getSettingsAction() {
  yield takeLatest(SETTINGS.GET.REQUEST, getSettings);
}

function* postSettingsAction() {
  yield takeLatest(SETTINGS.POST.REQUEST, postSettings);
}

function* settingsToDefaultAction() {
  yield takeLatest(SETTINGS.DEFAULT.REQUEST, settingsToDefault);
}

/**
 * Регистрирует сагу
 *
 * @yield {object}
 */
function* runSettingsSaga() {
  yield all([
    getSettingsAction(),
    postSettingsAction(),
    settingsToDefaultAction()
  ]);
}

export { runSettingsSaga };

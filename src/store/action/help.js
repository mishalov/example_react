import constants from "../actionTypes";
import { call, put, takeLatest, all, select } from "redux-saga/effects";
import Api from "../../lib/api";

const { HELP, NOTIFICATION } = constants;

const getCurrentTicket = state => state.help.ticket;

function* getListOfTickets({ payload: { ldapAlias } }) {
  try {
    const { data } = yield call(Api.getTicketList, ldapAlias);
    yield put({ type: HELP.LIST.SUCCESS, payload: data });
  } catch (e) {}
}

function* createTicket({ payload: { data } }) {
  try {
    yield call(Api.createTicket, data);
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "success",
        title: "Success",
        message: "Ticket was successfuly created!"
      }
    });
    yield put({
      type: HELP.LIST.REQUEST,
      payload: { ldapAlias: data.ldapAlias }
    });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message: e.toSting()
      }
    });
  }
}

function* getTicketById({ payload: { id } }) {
  try {
    const { data } = yield call(Api.getTicketById, id);
    yield put({ type: HELP.GET.SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message: e.toSting()
      }
    });
  }
}

function* createAnswer({ payload: { data, ticketId } }) {
  try {
    yield call(Api.createAnswer, data, ticketId);
    let ticket = (yield select(getCurrentTicket)).data;
    ticket.answers.push(data);
    yield put({ type: HELP.GET.SUCCESS, payload: ticket });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message: e.toSting()
      }
    });
  }
}

function* getAllTickets() {
  try {
    const { data } = yield call(Api.getAllTickets);
    yield put({ type: HELP.ALL.SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: NOTIFICATION.SHOW,
      payload: {
        type: "error",
        title: "Error",
        message: e.toSting()
      }
    });
  }
}

function* getListOfTicketsAction() {
  yield takeLatest(HELP.LIST.REQUEST, getListOfTickets);
}

function* createTicketAction() {
  yield takeLatest(HELP.POST.REQUEST, createTicket);
}

function* getTicketByIdAction() {
  yield takeLatest(HELP.GET.REQUEST, getTicketById);
}

function* createAnswerAction() {
  yield takeLatest(HELP.PUT.REQUEST, createAnswer);
}

function* getAllTicketsAction() {
  yield takeLatest(HELP.ALL.REQUEST, getAllTickets);
}

function* runHelpSaga() {
  yield all([
    getListOfTicketsAction(),
    createTicketAction(),
    getTicketByIdAction(),
    createAnswerAction(),
    getAllTicketsAction()
  ]);
}

export { runHelpSaga };

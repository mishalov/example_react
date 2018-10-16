import requests from "../actionTypes";

const { HELP } = requests;

export default (
  state = {
    list: { data: [] },
    ticket: { data: {} }
  },
  action
) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    //ПОЛУЧЕНИЕ СПИСКА ТИКЕТОВ
    case HELP.LIST.REQUEST:
      return {
        ...state,
        list: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };

    case HELP.LIST.SUCCESS:
      return {
        ...state,
        list: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case HELP.LIST.ERROR:
      return {
        ...state,
        list: {
          loading: false,
          data: [],
          error: null,
          solved: false
        }
      };
    //ПОЛУЧЕНИЕ ОДНОГО ТИКЕТА
    case HELP.GET.REQUEST:
      return {
        ...state,
        ticket: {
          loading: true,
          data: { files: [], answers: [] },
          error: null,
          solved: false
        }
      };

    case HELP.GET.SUCCESS:
      return {
        ...state,
        ticket: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case HELP.GET.ERROR:
      return {
        ...state,
        ticket: {
          loading: false,
          data: { files: [], answers: [] },
          error: null,
          solved: false
        }
      };

    //ПОЛУЧЕНИЕ ВСЕХ ТИКЕТОВ
    case HELP.ALL.REQUEST:
      return {
        ...state,
        allTickets: {
          loading: true,
          data: [],
          error: null,
          solved: false
        }
      };

    case HELP.ALL.SUCCESS:
      return {
        ...state,
        allTickets: {
          loading: false,
          data: payload,
          error: null,
          solved: true
        }
      };

    case HELP.ALL.ERROR:
      return {
        ...state,
        allTickets: {
          loading: false,
          data: [],
          error: null,
          solved: false
        }
      };
    default:
      return state;
  }
};

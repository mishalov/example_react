import requests from "../actionTypes";

const { SETTINGS } = requests;

export default (state, action) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    /*
    получение настроек
    */
    case SETTINGS.GET.REQUEST:
      return {
        ...state,

        loading: true,
        data: null,
        error: null,
        solved: false
      };

    case SETTINGS.GET.ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: payload,
        solved: false
      };

    case SETTINGS.GET.SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: null,
        solved: true
      };

    default: {
      return {
        ...state
      };
    }
  }
};

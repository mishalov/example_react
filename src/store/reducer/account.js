import requests from "../actionTypes";

const { ACCOUNT } = requests;

export default (state, action) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    case ACCOUNT.POST.REQUEST:
      return {
        ...state,
        signInLoading: true,
        signInData: null,
        signInError: null,
        logined: false
      };

    case ACCOUNT.POST.SUCCESS:
      return {
        ...state,
        signInLoading: false,
        signInData: payload,
        signInError: null,
        logined: true
      };

    case ACCOUNT.POST.ERROR:
      return {
        ...state,
        signInLoading: false,
        signInData: null,
        signInError: payload,
        logined: false
      };
    case ACCOUNT.GET.REQUEST:
      return {
        ...state,
        meLoading: true,
        meData: null,
        meError: null
      };
    case ACCOUNT.GET.SUCCESS:
      return {
        ...state,
        meLoading: false,
        meData: payload,
        meError: null
      };
    case ACCOUNT.GET.ERROR:
      return {
        ...state,
        meLoading: false,
        meData: null,
        meError: payload
      };
    case ACCOUNT.LOGOUT.REQUEST:
      return {
        ...state,
        signInLoading: false,
        signInData: null,
        signInError: null,
        logined: false,
        meLoading: false,
        meData: null,
        meError: null
      };

    case ACCOUNT.KEEP.REQUEST:
      return {
        ...state,
        keeperSolved: false
      };

    case ACCOUNT.KEEP.SUCCESS:
      return {
        ...state,
        keeperSolved: true
      };
    default: {
      return {
        ...state
      };
    }
  }
};

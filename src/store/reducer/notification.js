import requests from "../actionTypes";
const { NOTIFICATION } = requests;

var defNotification = () => {
  return {
    type: "",
    title: "",
    message: ""
  };
};

export default (state = defNotification, action) => {
  const { type } = action;
  const { payload } = action;
  switch (type) {
    case NOTIFICATION.SHOW: {
      return {
        ...state,
        type: payload.type,
        title: payload.title,
        message: payload.message
      };
    }
    default: {
      return {
        ...state,
        type: null,
        title: null,
        message: null
      };
    }
  }
};

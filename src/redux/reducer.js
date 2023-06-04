import * as types from "./actionType";

const init = {
  loading: false,
  error: false,
  isAuth:localStorage.getItem('projectTrackerToken')?true:false,
  projects: [],
};

const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case types.REQUEST_PROJECT_LIST:
      return {
        ...state,
        loading: true,
        error:false
      };

    case types.SUCCESS_PROJECT_LIST:
      return {
        ...state,
        loading: false,
        projects: payload,
      };

      case types.SUCCESS_LOGIN:
        return {
          ...state,
          loading: false,
          projects: payload,
          isAuth:true
        };
    case types.FAILURE_PROJECT_LIST:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export { reducer };

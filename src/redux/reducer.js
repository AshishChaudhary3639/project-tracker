import * as types from "./actionType";

const init = {
  loading: false,
  error: false,
  page:1,
  currentPage:1,
  totalPages:1,
  perPage:10,
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
        page:payload.page,
        currentPage:payload.currentPage,
        perPage:payload.perPage,
        totalPages:payload.totalPages,
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

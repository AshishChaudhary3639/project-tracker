import * as types from "./actionType";
import axios from "axios";
// Action Creators


// Async Action Creator
export const getProjects = (currentPage,sortOption='projectName') => (dispatch) => {
  dispatch({ type: types.REQUEST_PROJECT_LIST });
  // Make the API call to fetch paginated items
  return axios
    .get(`https://good-gold-buffalo-fez.cyclic.app/getprojects?page=${currentPage}&selectedVal=${sortOption}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("projectTrackerToken")}`,
      },
    })
    .then((data) => {
      const { projects, currentPage, totalPages } = data.data;
      dispatch({
        type: types.SUCCESS_PROJECT_LIST,
        payload: {
          projects,
          currentPage,
          totalPages,
        },
      });
    })
    .catch((error) => {
        dispatch({ type: types.FAILURE_PROJECT_LIST,payload:error });
    });
};


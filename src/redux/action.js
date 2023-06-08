import * as types from "./actionType";
import axios from "axios";
// Action Creators


// Async Action Creator
export const getProjects = (currentPage,sortOption='projectName') => (dispatch) => {
  dispatch({ type: types.REQUEST_PROJECT_LIST });
  // Make the API call to fetch paginated items
  return axios
    .get(`http://localhost:8080/getprojects?page=${currentPage}&selectedVal=${sortOption}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("projectTrackerToken")}`,
      },
    })
    .then((data) => {
        console.log(data.data.projects);
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

// const updateProjectsStatus =
//   ({ id, status, page }) =>
//   (dispatch) => {
//     dispatch({ type: types.REQUEST_PROJECT_LIST });
//     return axios
//       .patch(
//         `http://localhost:8080/getprojects/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "projectTrackerToken"
//             )}`,
//           },
//         }
//       )
//       .then(() => {
//         getProjects(page)
//       })
//       .catch((e) => {
//         dispatch({ type: types.FAILURE_PROJECT_LIST, payload: e });
//       });
//     // console.log(payload)
//   };

// export { updateProjectsStatus };

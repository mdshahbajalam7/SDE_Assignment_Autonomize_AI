import axiosInstanceMain from "../utils/axiosInstanceMain";

export const GET_USERS = "GET_USERS";
export const IS_LOADING = "IS_LOADING";
export const IS_ERROR = "IS_ERROR";
export const CREATE_USER = "CREATE_USER";

const getgithubuser = (userdata) => {
  return {
    type: GET_USERS,
    payload: userdata,
  };
};

const createuser = (userdata) => {
  return {
    type: CREATE_USER,
    payload: userdata,
  };
};
// Action Creator for loading state
const setIsLoading = () => {
  return {
    type: IS_LOADING,
  };
};

// Action Creator for error state
const setIsError = () => {
  return {
    type: IS_ERROR,
  };
};

// export const fetchUserData = (username) => async (dispatch) => {
//   console.log("fetchUserData", username);
//   try {
//     const response = await axiosInstanceMain.get(`/api/saveUsers/`, username);
//     dispatch(getgithubuser(response.data));
//   } catch (error) {
//     dispatch({ type: IS_ERROR, payload: error.message }); // Set error state
//   }
// };

export const fetchUserData = (username) => async (dispatch) => {
  console.log("fetchUserData", username);
  try {
    const response = await axiosInstanceMain.get(`/api/users`);
    dispatch(getgithubuser(response.data));
  } catch (error) {
    dispatch({ type: IS_ERROR, payload: error.message }); // Set error state
  }
};
// export const fetchUserData = (username) => async (dispatch) => {
//   console.log("Fetching user data...", username);
//   try {
//     dispatch(setIsLoading()); // Set loading state

//     let response;
//     if (username?.trim()) {
//       // Call API with username
//       response = await axiosInstanceMain.post(`/api/saveUsers`, {
//         username: username,
//       });
//     } else {
//       // Call API to fetch all users
//       response = await axiosInstanceMain.get(`/api/users`);
//     }

//     dispatch(getgithubuser(response.data)); // Dispatch user data to the store
//   } catch (error) {
//     dispatch(setIsError(error.message)); // Dispatch error state
//     console.error("Error fetching user data:", error.message);
//   }
// };

export const createUser = (username) => async (dispatch) => {
  try {
    dispatch(setIsLoading());
    const response = await axiosInstanceMain
      .post(`/api/saveUsers`, {
        username: username,
      })
      .then(() => {
        dispatch(getgithubuser(response.data));
      });

    // dispatch(createuser(response.data));
    // fetchUserData();
    dispatch(getgithubuser(response.data));
  } catch (error) {
    dispatch(setIsError(), { payload: error.message });
    // dispatch({ type: IS_ERROR, payload: error.message }); // Set error state
  }
};

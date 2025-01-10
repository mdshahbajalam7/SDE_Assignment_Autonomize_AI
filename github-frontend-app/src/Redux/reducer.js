import { CREATE_USER, GET_USERS, IS_ERROR, IS_LOADING } from "./action";

const GithubUserInitialState = {
  isLoading: false,
  isError: false,
  users: [],
};

export const reducer = (state = GithubUserInitialState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return { ...state, isLoading: true, isError: false };
    }
    case GET_USERS:
      return {
        ...state,
        isLoading: false, // Loading is complete
        isError: false, // Reset error state on success
        users: action.payload,
        // loading: false,
      };
    case CREATE_USER: {
      return {
        ...state,
        isLoading: false, // Loading is complete
        isError: false, // Reset error state on success
        users: action.payload,
      };
    }
    case IS_ERROR: {
      return { ...state, isError: false, isLoading: true };
    }
    default:
      return state;
  }
};

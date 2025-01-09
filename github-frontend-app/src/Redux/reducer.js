import { GET_USERS } from "./action";

const GithubUserInitialState = {
  //   isLoading: false,
  //   isError: false,
  users: [],
};

export const reducer = (state = GithubUserInitialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        // loading: false,
      };
    default:
      return state;
  }
};

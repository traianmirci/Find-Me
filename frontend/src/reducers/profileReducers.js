import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
} from '../constants/profileConstants';

export const profileReducer = (
  state = { links: [], bio: {}, contact: [] },
  action
) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { loading: true, profile: {} };
    case PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

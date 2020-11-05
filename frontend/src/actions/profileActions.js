import axios from 'axios';
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
} from '../constants/profileConstants';

export const profile = () => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_REQUEST });

    const { data } = await axios.get(`/api/v1/user/profile/t`);

    dispatch({
      type: PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

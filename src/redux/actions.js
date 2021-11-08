import constants from '../theme/constants';
const {actionTypes} = constants;

export const setHeight = height => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_HEIGHT,
      payload: height,
    });
  };
};

export const setUserInfoAction = userInfo => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};

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

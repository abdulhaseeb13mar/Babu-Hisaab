import {combineReducers} from 'redux';
import constants from '../theme/constants';
import {height as InitalHeight} from '../components';

const {actionTypes} = constants;

const userInfo = null;
const currentScreen = 'Home';
const height = InitalHeight;
const appData = {
  allUsers: [],
  selectedUser: {},
};

const userReducer = (state = userInfo, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      if (action.payload === null) return null;
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const AppReducer = (state = appData, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_USERS:
      state = Object.assign({}, state, {...action.payload});
      return state;

    case actionTypes.SET_SELECTED_USER:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const ScreenReducer = (state = currentScreen, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SCREEN:
      state = action.payload;
      return state;

    default:
      break;
  }
  return state;
};

const HeightReducer = (state = height, action) => {
  switch (action.type) {
    case actionTypes.SET_HEIGHT:
      state = action.payload;
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({
  userReducer,
  HeightReducer,
  ScreenReducer,
  AppReducer,
});

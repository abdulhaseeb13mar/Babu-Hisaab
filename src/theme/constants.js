const Constants = {
  async: {
    user: 'user',
  },
  collections: {
    USERS_INFO: 'USERS_INFO',
    DUES_ON_OTHER: 'DUES_ON_OTHER',
    DUES_ON_ME: 'DUES_ON_ME',
  },
  actionTypes: {
    SET_USER_INFO: 'SET_USER_INFO',
    SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
    SET_HEIGHT: 'SET_HEIGHT',
    SET_ALL_USERS: 'SET_ALL_USERS',
  },
  authScreens: {
    Login: 'Login',
  },
  appScreens: {
    Home: 'Home',
    AddDues: 'AddDues',
  },
  snackbarColors: {
    Success: '#2e7d32',
    Error: '#d50000',
    Info: '#24806CFF',
  },
  snackbarType: {
    SNACKBAR_SUCCESS: 'SNACKBAR_SUCCESS',
    SNACKBAR_ERROR: 'SNACKBAR_ERROR',
    SNACKBAR_INFO: 'SNACKBAR_INFO',
  },
};

export default Constants;

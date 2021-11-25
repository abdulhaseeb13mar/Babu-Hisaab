import Snackbar from 'react-native-snackbar';
import constants from '../theme/constants';

const {snackbarType, snackbarColors} = constants;

export const showSnackbar = (text, type) => {
  var backgroundColor = '';

  switch (type) {
    case snackbarType.SNACKBAR_SUCCESS:
      backgroundColor = snackbarColors.Success;
      break;
    case snackbarType.SNACKBAR_ERROR:
      backgroundColor = snackbarColors.Error;
      break;
    case snackbarType.SNACKBAR_INFO:
      backgroundColor = snackbarColors.Info;
      break;
    default:
      backgroundColor = snackbarColors.Info;
  }

  return Snackbar.show({
    text: text,
    backgroundColor: backgroundColor,
  });
};

import {CommonActions, StackActions} from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(name, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function navigateAndReset(routeName, params = {}) {
  navigator.reset({
    index: 0,
    routes: [{name: routeName, params: params}],
  });
}

function push(name, params) {
  navigator.dispatch(StackActions.push(name, params));
}

function goBack() {
  navigator.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  push,
  navigateAndReset,
};

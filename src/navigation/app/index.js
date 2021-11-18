import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {constants} from '../../theme';

const Stack = createStackNavigator();

import {
  Home,
  AddDues,
  DueSelection,
  AllDues,
  MyDuesOnSomeone,
} from '../../screens/app';

export default function AppStack() {
  const {appScreens} = constants;
  return (
    <Stack.Navigator
      initialRouteName={appScreens.Home}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen name={appScreens.Home} component={Home} />
      <Stack.Screen name={appScreens.AddDues} component={AddDues} />
      <Stack.Screen name={appScreens.DueSelection} component={DueSelection} />
      <Stack.Screen name={appScreens.AllDues} component={AllDues} />
      <Stack.Screen
        name={appScreens.MyDuesOnSomeone}
        component={MyDuesOnSomeone}
      />
    </Stack.Navigator>
  );
}

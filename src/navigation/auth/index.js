import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {constants} from '../../theme';

const Stack = createStackNavigator();

import {Login} from '../../screens/auth';

export default function AuthStack() {
  const {authScreens} = constants;
  return (
    <Stack.Navigator
      initialRouteName={authScreens.Login}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen name={authScreens.Login} component={Login} />
    </Stack.Navigator>
  );
}
